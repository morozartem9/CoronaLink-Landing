import React from "react";

import * as globalClasses from "../../styles/global.css";
import * as classes from "./contact-us.css";
import { links } from "../../constants/router/links";
import { compClassName } from "../../utils/composed-class-name";
import { condClassName } from "../../utils/conditional-class-name";
import { keys } from "../../constants/internationalization/keys";
import { useInternationalization } from "../../hooks/use-internationalization";
import { isEmpty, isNil, not } from "../../utils/predicates";

const send = (data) => fetch(
  "https://google.com",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  },
);

const maxFileSize = 30000000;

const File = React.memo(({ onChange }) => {
  const [{ translate }] = useInternationalization();

  const [fileName, setFileName] = React.useState(null);

  const [error, setError] = React.useState(null);

  const fileReader = new FileReader();

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (file.size > maxFileSize) {
      setError(translate(keys.maxFileSizeExceeded));

      return;
    }

    setError(null);

    setFileName(event.target.files[0].name);

    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => onChange(fileReader.result);

    fileReader.onerror = () => setError(translate(keys.errorWhileReadingFile));
  };

  const handleButtonClick = (event) => {
    fileName && event.preventDefault();

    onChange(null);

    setFileName(null);

    setError(null);
  };

  return (
    <>
      <label className={classes.file}>
        <input type="file" onChange={handleChange} disabled={fileName} />

        <div
          className={fileName ? classes.removeFileButton : classes.uploadFileButton}
          onClick={handleButtonClick}
        />

        {
          error
            ? <p className={classes.error}>{error}</p>
            : fileName
            ? <p className={classes.fileName}>{fileName}</p>
            : <p className={classes.filePlaceholder}>{translate(keys.uploadFile)}</p>
        }

      </label>
    </>
  );
});

const Message = React.memo(({
                              value,
                              onChange,
                            }) => {
  const [{ translate }] = useInternationalization();

  return (
    <div className={classes.message}>
      <p className={globalClasses.headlineThree}>
        {translate(keys.wantToAddSomething)}
      </p>

      <textarea
        className={classes.messageTextArea}
        placeholder={translate(keys.typeYourMessage)}
        value={isNil(value) ? "" : value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
});

const Input = React.memo(({
                            value,
                            onChange,
                            enhancer,
                            placeholder,
                            error,
                          }) => {
  const enhancedOnChange = (event) => {
    const enhancedValue = !isNil(enhancer)
      ? enhancer(value, event.target.value)
      : event.target.value;

    onChange(enhancedValue);
  };

  return (
    <>
      <input
        className={classes.input}
        type="text"
        value={isNil(value) ? "" : value}
        onChange={enhancedOnChange}
        placeholder={placeholder}
      />

      <div className={classes.errorContainer}>

        {
          !isNil(error) && (
            <p className={classes.error}>
              {error}
            </p>
          )
        }

      </div>

    </>
  );
});

const Form = () => {
  const [{ translate }] = useInternationalization();

  const [pending, togglePending] = React.useReducer(not, false);

  const [success, toggleSuccess] = React.useReducer(not, false);

  const [error, setError] = React.useState({});

  const [organization, setOrganization] = React.useState(undefined);

  const [phone, setPhone] = React.useState(undefined);

  const [email, setEmail] = React.useState(undefined);

  const [message, setMessage] = React.useState(undefined);

  const [file, setFile] = React.useState(undefined);

  const phoneEnhancer = (prevPhone, nextPhone) => /^[\d ()+-]+$/.test(nextPhone) ? nextPhone : phone;

  const onSend = (event) => {
    event.preventDefault();

    const newError = {};

    if (!organization) {
      newError.organization = translate(keys.organizationIsRequired);
    }

    if (isNil(email)) {
      newError.email = translate(keys.emailIsRequired);
    } else {
      // eslint-disable-next-line no-useless-escape
      const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

      if (!valid) {
        newError.email = translate(keys.invalidEmail);
      }
    }

    setError(newError);

    if (isEmpty(newError)) {
      togglePending();

      send({
        organization,
        phone,
        email,
        message,
        file,
      })
        .then(() => {
          toggleSuccess();

          setTimeout(toggleSuccess, 3000);
        })
        .catch((error) => {
          setError({ common: error.message });
        })
        .finally(togglePending);
    }
  };

  return (
    <form className={classes.form}>
      <Input
        value={organization}
        onChange={setOrganization}
        placeholder={translate(keys.organization)}
        error={error.organization}
      />

      <Input
        value={phone}
        onChange={setPhone}
        enhancer={phoneEnhancer}
        placeholder={translate(keys.phone)}
        error={error.phone}
      />

      <Input
        value={email}
        onChange={setEmail}
        placeholder={translate(keys.email)}
        error={error.email}
      />

      <Message value={message} onChange={setMessage} />

      <File onChange={setFile} />

      <button
        className={compClassName(
          globalClasses.button,
          classes.sendButton,
          condClassName(classes.pending, pending),
        )}
        onClick={onSend}
        disabled={success}
      >
        {success ? translate(keys.sentSuccessfully) : translate(keys.send)}
      </button>

      <div className={classes.errorContainer}>

        {
          !isNil(error.common) && (
            <p className={classes.error}>
              {error.common}
            </p>
          )
        }

      </div>
    </form>
  );
};

const ContactUs = () => {
  const [{ translate }] = useInternationalization();

  return (
    <div id={links.contactUs} className={compClassName(globalClasses.content, classes.contactUs)}>
      <h2 className={globalClasses.headlineTwo}>
        {translate(keys.contactUs)}
      </h2>

      <Form />
    </div>
  );
};

ContactUs.displayName = "ContactUs";
Form.displayName = "Form";
Input.displayName = "Input";
Message.displayName = "Message";
File.displayName = "File";

export { ContactUs };
