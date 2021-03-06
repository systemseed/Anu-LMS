import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteContent from '../../../moleculas/Notebook/NoteContent';
import NotesList from '../../../moleculas/Notebook/NotesList';
import PageLoader from '../../../atoms/PageLoader';
import ErrorBoundary from '../../../atoms/ErrorBoundary';
import ShowNotesButton from '../../../moleculas/Notebook/ShowNotesButton';
import AddNoteButton from '../../../moleculas/Notebook/AddNoteButton';
import * as notebookActions from '../../../../actions/notebook';
import * as lessonNotebookActions from '../../../../actions/lessonNotebook';
import * as lessonSidebarActions from '../../../../actions/lessonSidebar';
import * as notebookHelpers from '../../../../helpers/notebook';

class LessonNotebook extends React.Component {
  constructor(props) {
    super(props);

    this.showNotes = this.showNotes.bind(this);
    this.openNote = this.openNote.bind(this);
    this.onBeforeNoteCreated = this.onBeforeNoteCreated.bind(this);
    this.onAfterNoteCreated = this.onAfterNoteCreated.bind(this);
    this.handleNotebookClose = this.handleNotebookClose.bind(this);
  }

  /**
   * Callback gets executed as soon as a user click
   * on note create button.
   */
  onBeforeNoteCreated() {
    // Set loading background.
    this.props.dispatch(lessonSidebarActions.setLoadingState());
  }

  /**
   * Callback gets executed as soon as a note was
   * created on the backend.
   */
  onAfterNoteCreated(note) {
    // Remove loading background and open a note.
    this.props.dispatch(lessonSidebarActions.removeLoadingState());
    this.openNote(note.id);
  }

  showNotes() {
    // Initialize notes syncronization.
    this.props.dispatch(lessonSidebarActions.open());
  }

  openNote(id) {
    this.props.dispatch(lessonNotebookActions.setActiveNote(id));
  }

  /**
   * Perform actions on closing the notebook pane.
   */
  handleNotebookClose() {
    const { activeNote, dispatch } = this.props;

    // Force save note to the backend.
    if (activeNote) {
      // Do not save empty note - it will be automatically removed.
      if (!notebookHelpers.isEmptyNote(activeNote)) {
        dispatch(notebookActions.saveNote(activeNote));
      }
    }

    // Close the notebook pane.
    dispatch(lessonSidebarActions.close());
  }

  render() {
    const { isNoteListVisible, isLoading, notes, activeNote } = this.props;

    return (
      <div className="lesson-notebook">
        {isLoading &&
        <PageLoader />
        }

        {!isLoading &&
        <ErrorBoundary>

          <div className={`notes-list-column ${isNoteListVisible ? 'visible' : 'hidden'}`}>

            <div className="notes-list-heading">
              <div className="title">All Notes</div>
              <AddNoteButton
                onBeforeSubmit={this.onBeforeNoteCreated}
                onAfterSubmit={this.onAfterNoteCreated}
              />
            </div>

            <NotesList
              notes={notes}
              activeNoteId={activeNote ? activeNote.id : 0}
              onClick={this.openNote}
            />
          </div>

          {!isNoteListVisible && activeNote &&
          <div className="note-column" id="note-column">
            <ShowNotesButton handleClick={this.showNotes} />
            <NoteContent note={activeNote} contextId="lesson" />
          </div>
          }

          <div className="save-close" onClick={() => this.handleNotebookClose()} onKeyPress={() => this.handleNotebookClose()}>
            { !isNoteListVisible && activeNote &&
            <Fragment>
              {notebookHelpers.isEmptyNote(activeNote) ?
                'Discard and Close' :
                'Save and Close'
              }
            </Fragment>
            }
            { isNoteListVisible &&
            <Fragment>Close Notes</Fragment>
            }

            <span className="close-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="#FFF" fillRule="nonzero" d="M0 9h12.17l-5.59 5.59L8 16l8-8-8-8-1.41 1.41L12.17 7H0z" />
              </svg>
            </span>
          </div>

        </ErrorBoundary>
        }
      </div>

    );
  }
}

LessonNotebook.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeNote: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isCollapsed: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isNoteListVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LessonNotebook.defaultProps = {
  activeNote: {},
};

LessonNotebook.contextTypes = {
  auth: PropTypes.shape({
    getRequest: PropTypes.func,
  }),
};

const mapStateToProps = ({ lessonSidebar, notebook }) => ({
  isCollapsed: lessonSidebar.sidebar.isCollapsed,
  isLoading: lessonSidebar.sidebar.isLoading,
  activeNote: notebookHelpers.getNoteById(notebook.notes, lessonSidebar.notes.noteId),
  // Display only non-empty notes in the list.
  notes: notebook.notes.filter(note => !notebookHelpers.isEmptyNote(note)),
  isNoteListVisible: lessonSidebar.notes.isNoteListVisible,
});

export default connect(mapStateToProps)(LessonNotebook);
