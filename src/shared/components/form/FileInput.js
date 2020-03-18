/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class FileInputField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string
      }),
      PropTypes.string
    ])
  };

  static defaultProps = {
    value: null
  };

  render() {
    const { onChange, name, value, accept } = this.props;

    return (
      <div className="form__form-group-file">
        <label htmlFor={name}>Choose the file</label>
        <span className="text-secondary">{value.name}</span>
        <input
          type="file"
          accept={accept}
          name={name}
          id={name}
          onChange={e => {
            e.preventDefault();
            // convert files to an array
            const files = [...e.target.files];
            const hasFile = files && files.length;
            let fileObject = null;
            if (hasFile) {
              fileObject = {
                file: files[0],
                name: files[0].name
              };
            }
            onChange(fileObject);
          }}
        />
      </div>
    );
  }
}

const renderFileInputField = props => {
  const { input, meta, accept } = props;
  return (
    <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
      <FileInputField {...input} accept={accept}  />
      {!meta.pristine && meta.error && (
        <span className="form__form-group-error">{meta.error}</span>
      )}
    </div>
  );
};

renderFileInputField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  })
};

renderFileInputField.defaultProps = {
  meta: null
};

export default renderFileInputField;
