import React from 'react';
import PropTypes from 'prop-types';

class Heading extends React.Component {

  componentDidMount() {
    // Report to the parent component that the loading is done.
    if (this.props.handleParagraphLoaded) {
      this.props.handleParagraphLoaded(this.props.id);
    }
  }

  componentDidUpdate() {
    // Report to the parent component that the loading is done.
    if (this.props.handleParagraphLoaded) {
      this.props.handleParagraphLoaded(this.props.id);
    }
  }

  render() {
    const { title, type } = this.props;
    return (
      <div className="container heading">
        <div className="row">
          <div className={`col-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8`}>

            {title && type === 'text_heading' &&
            <h4>{title}</h4>
            }

            {title && type !== 'text_heading' &&
            <h5>{title}</h5>
            }

          </div>
        </div>
      </div>
    );
  }
}

Heading.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  title: PropTypes.string,
  settings: PropTypes.object,
  handleParagraphLoaded: PropTypes.func,
};

export default Heading;