import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAct,
  editCategoryAct,
} from "../../store/dataSlice/dataActions";
import classes from "./CategoryLi.module.css";

const CategoryLi = ({ category }) => {
  const [editMode, setEditMode] = useState(false);
  const [titleInput, setTitleInput] = useState(category.title);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const onEditSubmit = (event) => {
    event.preventDefault();
    dispatch(editCategoryAct(token, category.id, titleInput));
    setEditMode(false);
  };

  const onDeleteSubmit = (event) => {
    dispatch(deleteCategoryAct(token, category.id));
  };
  return (
    <tr>
      <td>{category.id}</td>
      <td>
        {editMode ? (
          <form className={classes.edit_form}>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <button onClick={onEditSubmit}>&#10004;</button>
            <button type="button" onClick={() => setEditMode(false)}>
              &#x2715;
            </button>
          </form>
        ) : (
          <span>{category.title}</span>
        )}
      </td>
      <td>{new Date(category.created_at).toLocaleDateString("en-US")}</td>
      <td>{new Date(category.updated_at).toLocaleDateString("en-US")}</td>
      <td>{category.isActive ? "YES" : "NO"}</td>
      <td className={classes.action}>
        <span className={classes.edit} onClick={(e) => setEditMode(true)}>
          Edit
        </span>
        <span className={classes.delete} onClick={onDeleteSubmit}>
          Delete
        </span>
      </td>
    </tr>
  );
};

export default CategoryLi;
