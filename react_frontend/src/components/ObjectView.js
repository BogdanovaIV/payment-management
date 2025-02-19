import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import bgImageStyles from "../styles/BgImage.module.css";
import inputStyles from "../styles/Input.module.css";
import btnStyles from "../styles/Button.module.css";
import headerStyles from "../styles/Header.module.css";
import styles from "../styles/ObjectView.module.css";

import backgroundImage from "../assets/main-background.jpg";

import { postData, getData, putData } from "../api/axiosURL";
import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";
import ObjectSelect from "./ObjectSelect";
import {
  getNameByNameTable,
  getIDFromItem,
} from "../utils/selectFormParameters";
import SaveBar from "./SaveBar";
import SpinnerSecondary from "./Spinners";
import { useRedirect } from "../hooks/useRedirect";

const ObjectView = ({
  data,
  setData,
  fields,
  url,
  objectName,
  typeView,
  modalForms = [],
}) => {
  useRedirect("loggedOut");
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedField, setSelectedFiled] = useState({
    field: "",
    foreignKey: "",
  });
  const [hasLoaded, setHasLoaded] = useState(typeView === "add" ? true : false);

  const { id } = useParams();

  const history = useHistory();

  const showToast = useToast();

  const handleEditClick = async () => {
    try {
      history.push(`${url}${id}/edit`);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
      handleRequestError(err, showToast, t);
    }
  };
  const handleCancelClick = async () => {
    try {
      history.push(url);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
      handleRequestError(err, showToast, t);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const handleMount = async () => {
      if (typeView !== "add") {
        try {
          if (typeView === "edit") {
            await postData(`${url}${id}/lock/`);
          }

          const response = await getData(`${url}${id}/`);
          const responseData = response.data;
          let newData = { ...data };
          for (const [key, value] of Object.entries(responseData)) {
            if (
              Object.hasOwn(newData, key) &&
              typeof newData[key] === "object"
            ) {
              const foreignKey = newData[key]?.foreignKey;

              newData[key] = {
                id: value,
                name:
                  responseData[`${key}_${getNameByNameTable(foreignKey)}`] ||
                  "",
                foreignKey: foreignKey,
              };
            } else {
              newData[key] = value;
            }
          }
          if (isMounted) {
            setData(newData);
            setHasLoaded(true);
          }
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
          handleRequestError(err, showToast, t);
          if (typeView === "edit") {
            history.push(`${url}${id}`);
          }
        }
      }
    };

    handleMount();
    return () => {
      isMounted = false;
    };
  }, [id, t, typeView, url]);

  useEffect(() => {
    return async () => {
      try {
        if (typeView === "edit") {
          console.log(`Unlocking ID on unmount: ${id}`);
          await postData(`${url}${id}/unlock/`);
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
        handleRequestError(err, showToast, t);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => key !== "created_at" && key !== "updated_at")
          .map(([key, value]) => [
            key,
            typeof value === "object" && value !== null ? value.id : value,
          ])
      );
      if (typeView === "add") {
        const response = await postData(url, newData);
        history.push(`${url}${response.data.id}`);
        showToast(t("toast.success_add"), "success");
      } else if (typeView === "edit") {
        await putData(`${url}${id}/`, newData);
        history.goBack();
        showToast(t("toast.success_update"), "success");
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      let extraMessage = "";
      if (err.response?.status === 423) {
        if (typeView === "edit") {
          extraMessage = t("toast.data_not_save");
          history.push(`${url}${id}`);
        }
      }
      handleRequestError(err, showToast, t, extraMessage);
    }
  };

  const handleForeignKeyClick = (e, foreignKey) => {
    setSelectedFiled((prevSelected) => ({
      ...prevSelected,
      field: e.target.name,
      foreignKey,
    }));
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [foreignKey]: true,
    }));
  };

  useEffect(() => {
    if (selectedField.field) {
      setData((prevData) => ({
        ...prevData,
        [selectedField.field]: {
          id: getIDFromItem(selectedField.foreignKey, selectedItem),
          name:
            selectedItem[getNameByNameTable(selectedField.foreignKey)] || "",
        },
      }));
      setShowModal((prevShowModal) => ({
        ...prevShowModal,
        [selectedField.foreignKey]: false,
      }));
    }
  }, [selectedItem]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className={`${bgImageStyles.BgImage}`} style={backgroundStyle}>
      <Container className="pt-2">
        <Row className=" offset-lg-1 align-items-center justify-content-between text-center text-lg-start flex-column flex-lg-row">
          <Col className="text-center">
            <h1 className={`${headerStyles.Header} m-0`}>{objectName}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="px-4 py-1">
            {typeView === "view" && (
              <>
                <Button
                  className={`${btnStyles.ButtonTransparent} ${btnStyles.RedTransparent}`}
                  onClick={() => history.push(url)}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                  {t("button.cancel")}
                </Button>

                <Button
                  className={`${btnStyles.ButtonTransparent} ${btnStyles.BlueTransparent}`}
                  onClick={() => handleEditClick()}
                >
                  <i className="fa-solid fa-circle-plus"></i> {t("button.edit")}
                </Button>
              </>
            )}
          </Col>
        </Row>

        <Row>
          {hasLoaded ? (
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  {fields.map((item, itemIndex) => (
                    <Row key={itemIndex} className="align-items-end">
                      {item.map(
                        ({
                          id,
                          name,
                          type,
                          placeholder,
                          rows,
                          options,
                          readOnly,
                          as,
                          foreignKey,
                          disabled,
                        }) => (
                          <Col key={id} md={item.length === 1 ? 12 : 6}>
                            <Form.Group controlId={id}>
                              {type === "checkbox" ? (
                                <>
                                  <Form.Check
                                    label={placeholder}
                                    className={inputStyles.CheckBoxObject}
                                    disabled={typeView === "view" || readOnly}
                                    name={name}
                                    checked={data[name] ?? ""}
                                    onChange={handleChange}
                                  ></Form.Check>
                                </>
                              ) : (
                                <>
                                  <Form.Label className={styles.Label}>
                                    {placeholder}
                                  </Form.Label>
                                  <Col key={id} className="p-0 d-flex">
                                    <Form.Control
                                      className={inputStyles.InputObject}
                                      as={as}
                                      type={
                                        type !== "select" ? type : undefined
                                      }
                                      rows={rows || 1}
                                      readOnly={typeView === "view" || readOnly}
                                      disabled={
                                        foreignKey === undefined
                                          ? typeView === "view" || readOnly
                                          : typeView === "view" || disabled
                                      }
                                      placeholder={placeholder}
                                      name={name}
                                      value={
                                        foreignKey !== undefined
                                          ? data[name]?.name ?? ""
                                          : data[name] ?? ""
                                      }
                                      onChange={handleChange}
                                      onClick={
                                        foreignKey !== undefined && !disabled
                                          ? (e) =>
                                              handleForeignKeyClick(
                                                e,
                                                foreignKey
                                              )
                                          : undefined
                                      }
                                    >
                                      {options?.map((option, index) => (
                                        <option
                                          key={`${name}${index}`}
                                          value={option[0]}
                                        >
                                          {option[1]}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Col>
                                </>
                              )}

                              {errors[name]?.map((message, idx) => (
                                <Alert
                                  variant="warning"
                                  key={idx}
                                  className="mt-2"
                                >
                                  {message}
                                </Alert>
                              ))}
                            </Form.Group>
                          </Col>
                        )
                      )}
                    </Row>
                  ))}
                </Form.Group>
                {typeView === "view" ? (
                  <>
                    <Button
                      className={`${btnStyles.ButtonTransparent} ${btnStyles.OrangeTransparent}`}
                      onClick={() => history.push(`${url}${id}/delete`)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      {t("button.delete")}
                    </Button>
                  </>
                ) : (
                  <>
                    <SaveBar handleCancelClick={handleCancelClick} />
                    {errors.non_field_errors?.map((message, idx) => (
                      <Alert key={idx} variant="warning" className="mt-3">
                        {message}
                      </Alert>
                    ))}
                  </>
                )}
              </Form>
            </Container>
          ) : (
            <SpinnerSecondary />
          )}
        </Row>
      </Container>
      {modalForms ? (
        modalForms.map(({ url, columns, foreignKey, queryKey }) => (
          <ObjectSelect
            key={foreignKey}
            show={showModal[foreignKey]}
            handleClose={() =>
              setShowModal((prevShowModal) => ({
                ...prevShowModal,
                [foreignKey]: false,
              }))
            }
            setSelectedItem={setSelectedItem}
            url={url}
            columns={columns}
            queryKey={queryKey}
          />
        ))
      ) : (
        <></>
      )}
    </section>
  );
};

export default ObjectView;
