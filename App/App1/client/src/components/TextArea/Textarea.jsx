// @flow
import React from "react";

import classNames from "classnames";

import "./styles.scss";

type TextareaProps = {
  name?: string,
  text: string,
  id?: string,
  placeholder: string,
  text: string,
  onChange: Function,
  onClick?: Function,
  error: null | string,
  className: string,
  rows?: number,
  disabled?: boolean
};
export default function Textarea(props: TextareaProps) {
  const {
    placeholder,
    name,
    id,
    rows,
    text,
    onChange,
    error,
    className,
    onClick,
    disabled
  } = props;
  const hasErrors = error !== null;
  return (
    <div
      className={classNames(
        "form-input",
        { "has-errors": hasErrors },
        className
      )}
    >
      <textarea
        name={name}
        id={id}
        rows={rows}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        onClick={onClick}
        value={text}
        disabled={disabled}
      />
      {getFieldErrors(error)}
    </div>
  );
}

function getFieldErrors(error: string | null) {
  return error !== null ? (
    <ul className="form-errors">
      <li>{error}</li>
    </ul>
  ) : (
    ""
  );
}

Textarea.defaultProps = {
  error: null,
  className: "",
  onChange: () => {},
  placeholder: "",
  rows: 10,
  text: "",
  disabled: false
};
