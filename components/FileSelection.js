import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/clientApp";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

function FileSelection(props) {
  const { user } = props;
  const file = useRef();

  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);
  const img = useRef();
  const listRef = ref(storage, user?.uid, props.fileNum);
  const options = [
    { value: "none", label: "empty" },
    { value: "image", label: "IMAGE :  [ .png / .jpg ]" },
    { value: "video", label: "VIDEO :  [ .mp4 ] " },
    // { value: "model", label: "MODEL" },
    // { value: "shader", label: "SHADER" },
  ];
  function handleSelectionChange(e) {
    const selection = e.value;

    if (selection === "none") return;
    if (selection === "image") {
      file.current.accept = ".png,.jpg,.jpeg";
      file.current.format = "image";
    }
    if (selection === "video") {
      file.current.accept = ".mp4";
      file.current.format = "video";
    }

    file.current.style.display = "block";
  }

  function uploadFile(e) {
    setLoading(true);
    const curFile = e.target.files[0];
    if (curFile === null) return;
    let uploadRef;

    uploadRef = ref(storage, `${user.uid}/${props.fileNum}`);
    uploadBytes(uploadRef, curFile).then(() => {
      alert(`ARTWORK FILE #${props.fileNum} has successfully been uploaded`);
      setLoading(false);
      updateDB();
    });
  }

  async function updateDB() {
    const dbRef = doc(db, `artists/${user.id}/files/${props.fileNum}`);
    return await setDoc(dbRef, { url: list, name: "new" });
  }

  async function getDataFromDB() {
    const fileRef = doc(db, `artists/${user?.id}/files/${props.fileNum}`);
    let data = await getDoc(fileRef).then((doc) => doc.data());
    img.current.src = data.url;
  }

  useEffect(() => {
    //GET URLS FROM STORED FILES
    listAll(listRef).then((res) => {
      const item = res.items[props.fileNum];
      if (!item) return;
      getDownloadURL(item).then((url) => setList(url));
    });

    if (user) getDataFromDB();
  });

  return (
    <div>
      <h3>Select format of file, upload file</h3>
      <Select
        options={options}
        instanceId={"files"}
        onChange={handleSelectionChange}
      />
      {loading ? (
        <div> ~~ upload is in progress ! ~~ </div>
      ) : (
        <div>
          <input
            type="file"
            ref={file}
            style={{ display: "none" }}
            format={"none"}
            onChange={uploadFile}
          />
          <video ref={img} style={{ width: "8rem", height: "8rem" }} />
        </div>
      )}
    </div>
  );
}

export default FileSelection;
