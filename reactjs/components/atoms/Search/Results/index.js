import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';

const availableSearchComponents = {
  'lesson': dynamic(import('../LessonItem')),
  'paragraph_comment': dynamic(import('../CommentItem')),
  'notebook': dynamic(import('../NotebookItem')),
  'media_resource': dynamic(import('../ResourceItem')),
};

const SearchResults = ({ results, isFetched, isError }) => (
  <div className="search-results">

    {!isError && results.map(resultItem => {
      const SearchItemComponent = availableSearchComponents[resultItem.type];
      if (SearchItemComponent) {
        return <SearchItemComponent key={resultItem.entity.uuid} searchItem={resultItem} />;
      }
      return null;
    })}

    {results.length === 0 && isFetched && !isError &&
    <div>
      There are no search results. Please someone smart - update this copy.
    </div>
    }

    {isError &&
    <div>
      The error has occurred. Please someone smart - update this copy.
    </div>
    }

  </div>
);

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape()),
  isFetching: PropTypes.bool,
  isFetched: PropTypes.bool,
  isError: PropTypes.bool,
};

SearchResults.defaultProps = {
  results: [],
  isFetching: false,
  isFetched: false,
  isError: false,
};

const mapStateToProps = ({ search }) => ({
  results: search.results,
  isFetching: search.isFetching,
  isFetched: search.isFetched,
  isError: search.isError,
});

export default connect(mapStateToProps)(SearchResults);
