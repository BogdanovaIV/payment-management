import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import bgImageStyles from "../styles/BgImage.module.css";
import inputStyles from "../styles/Input.module.css";
import btnStyles from "../styles/Button.module.css";
import headerStyles from "../styles/Header.module.css";
import styles from "../styles/ObjectView.module.css";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { postData, getData, putData } from "../api/axiosURL";
import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";
import ObjectSelect from "./ObjectSelect";
import { getNameFromItem, getIDFromItem } from "../utils/selectFormParameters";

import backgroundImage from "../assets/main-background.jpg";

import SaveBar from "./SaveBar";

const ObjectView = ({
  data,
  setData,
  fields,
  url,
  objectName,
  typeView,
  modalForms = [],
}) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedField, setSelectedFiled] = useState({
    field: "",
    foreignKey: "",
  });

  const { id } = useParams();

  const history = useHistory();

  const showToast = useToast();

  const handleEditClick = () => {
    history.push(`${url}${id}/edit`);
  };

  useEffect(() => {
    const handleMount = async () => {
      if (typeView !== "add") {
        try {
          const response = await getData(`${url}${id}/`);
          setData(response.data);
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
          handleRequestError(err, showToast, t);
        }
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
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
      handleRequestError(err, showToast, t);
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
      setData({
        ...data,
        [selectedField.field]: {
          id: getIDFromItem(selectedField.foreignKey, selectedItem),
          name: getNameFromItem(selectedField.foreignKey, selectedItem),
        },
      });
      setShowModal({ ...showModal, [selectedField.foreignKey]: false });
    }
  }, [selectedItem]);

  const handleClearFilterClick = (field) => {
    setData((prevData) => ({
      ...prevData,
      [field]: { id: "", name: "" },
    }));
  };

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
            {typeView === "view" ? (
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
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
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
                                    value={data[name]}
                                    onChange={handleChange}
                                  >
                                    {options?.map((option, index) => (
                                      <option
                                        key={`${name}${index}`}
                                        value={option[0]}
                                      >
                                        {option[1]}
                                      </option>
                                    ))}
                                  </Form.Check>
                                </>
                              ) : (
                                <>
                                  <Form.Label className={styles.Label}>
                                    {placeholder}
                                  </Form.Label>
                                  <Col className="p-0 d-flex">
                                    <Form.Control
                                      className={inputStyles.InputObject}
                                      as={as}
                                      type={
                                        type !== "select" ? type : undefined
                                      }
                                      rows={rows || 1}
                                      readOnly={typeView === "view" || readOnly}
                                      placeholder={placeholder}
                                      name={name}
                                      value={
                                        foreignKey !== undefined
                                          ? data[name].name
                                          : data[name]
                                      }
                                      onChange={handleChange}
                                      onClick={
                                        foreignKey !== undefined
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
                                    {foreignKey !== undefined ? (
                                      <>
                                        <Button
                                          className={`${btnStyles.ButtonIcon} ${btnStyles.BlueIcon}`}
                                          onClick={() =>
                                            handleClearFilterClick(name)
                                          }
                                        >
                                          <i className="fa-regular fa-trash-can"></i>
                                        </Button>
                                      </>
                                    ) : (
                                      <></>
                                    )}
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
                    <SaveBar />
                    {errors.non_field_errors?.map((message, idx) => (
                      <Alert key={idx} variant="warning" className="mt-3">
                        {message}
                      </Alert>
                    ))}
                  </>
                )}
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
      {modalForms ? (
        modalForms.map(({ url, columns, foreignKey, queryKey }) => (
          <ObjectSelect
            key={foreignKey}
            show={showModal[foreignKey]}
            handleClose={() =>
              setShowModal({ ...showModal, [foreignKey]: false })
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
