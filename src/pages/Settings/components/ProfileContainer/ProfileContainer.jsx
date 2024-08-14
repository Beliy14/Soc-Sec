import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThisPost from "./ThisPost";
import { addDataProfile } from "../../../../store/slices/dataProfileSlice";
import s from "./profileContainer.module.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IconContext } from "react-icons";
import avaMan1 from "../../../../assets/avatars/ava-man1.webp";
import avaMan2 from "../../../../assets/avatars/ava-man2.png";
import avaMan3 from "../../../../assets/avatars/ava-man3.webp";
import avaWoman1 from "../../../../assets/avatars/ava-woman1.webp";
import avaWoman2 from "../../../../assets/avatars/ava-woman2.webp";

const ProfileContainer = () => {
  const posts = useSelector((state) => state.posts.posts);
  const { name, dateBirth, description, avatar } = useSelector((state) => state.dataProfile);

  const nameRef = useRef(null);
  const dateBirthRef = useRef(null);
  const descriptionRef = useRef(null);

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(avatar);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  const saveData = () => {
    if (!nameRef.current.value && !dateBirthRef.current.value && !descriptionRef.current.value && !selectedImage) return;
    dispatch(
      addDataProfile({
        name: nameRef.current?.value || name,
        dateBirth: dateBirthRef.current?.value || dateBirth,
        description: descriptionRef.current?.value || description,
        avatar: selectedImage // Добавляем выбранный аватар
      })
    );
    nameRef.current.value = "";
    dateBirthRef.current.value = "";
    descriptionRef.current.value = "";
  };

  return (
    <div className={s.container}>
      <h2>My data:</h2>

      <div className={s.avatarContainer}>
        <label>
          <input type="radio" name="avatar" value={avaMan1} checked={selectedImage === avaMan1} onChange={handleImageChange} />
            <img src={avaMan1} />
        </label>
        <label>
          <input type="radio" name="avatar" value={avaMan2} checked={selectedImage === avaMan2} onChange={handleImageChange} />
            <img src={avaMan2} />
        </label>
        <label>
          <input type="radio" name="avatar" value={avaMan3} checked={selectedImage === avaMan3} onChange={handleImageChange} />
            <img src={avaMan3} />
        </label>
        <label>
          <input type="radio" name="avatar" value={avaWoman1} checked={selectedImage === avaWoman1} onChange={handleImageChange} />
            <img src={avaWoman1} />
        </label>
        <label>
          <input type="radio" name="avatar" value={avaWoman2} checked={selectedImage === avaWoman2} onChange={handleImageChange} />
            <img src={avaWoman2} />
        </label>
      </div>

      <div className={s.dateContainer}>
        <input className={s.inputData} type="text" placeholder="Name" ref={nameRef} />
        {name && name.length > 0 && (
          <IconContext.Provider value={{ size: "24px" }}>
            <IoIosArrowRoundForward />
          </IconContext.Provider>
        )}
        <p>{name}</p>
      </div>
      <div className={s.dateContainer}>
        <input className={s.inputData} type="date" placeholder="Date of birth" min="1900-01-01" max={new Date().toISOString().split("T")[0]} ref={dateBirthRef} />
        {dateBirth && dateBirth.length > 0 && (
          <IconContext.Provider value={{ size: "34px" }}>
            <IoIosArrowRoundForward />
          </IconContext.Provider>
        )}
        <p>{dateBirth}</p>
      </div>
      <div className={s.dateContainer}>
        <input className={s.inputData} type="text" placeholder="Profile description" ref={descriptionRef} />
        {description && description.length > 0 && (
          <IconContext.Provider value={{ size: "24px" }}>
            <IoIosArrowRoundForward />
          </IconContext.Provider>
        )}
        <p>{description}</p>
      </div>
      <button onClick={saveData} className={s.saveData}>
        Save
      </button>

      <h2>My posts:</h2>
      {posts.length ? (
        posts.map((post) => <ThisPost key={post.id} post={post} />)
      ) : (
        <Link className="link" to="/profile">
          Create your first post!
        </Link>
      )}
    </div>
  );
};

export default ProfileContainer;