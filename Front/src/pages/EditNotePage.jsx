import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import NoteForm from "../components/NoteForm";
const apiURL = import.meta.env.VITE_API_URL;

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    axios.get(`${apiURL}/api/notes/${id}`).then((res) => {
      setInitialData({
        title: res.data.title,
        description: res.data.description,
      });
    });
  }, [id]);

  const handleUpdate = async (note) => {
    await axios.put(`${apiURL}/api/notes/${id}`, note).then((res) => {
      if (res.status === 200) {
        toast.success("¡Nota actualizada con éxito!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/");
      } else {
        toast.error("Error al actualizar la nota", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-8">Editar Nota</h1>
      <NoteForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditNotePage;
