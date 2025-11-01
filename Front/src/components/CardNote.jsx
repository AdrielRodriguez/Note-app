import { SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
// id
const CardNote = ({ title, description, date, id, onDelete }) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const deleteNote = async () => {
    try {
      // Eliminando la nota de la DB
      await axios
        .delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Error al eliminar la nota");
          }

          toast.success("¡Nota eliminada con éxito", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
          });

          // Eliminamos la nota desde el front desde la UI
          if (onDelete) onDelete(id);

          // cerrar el modal
          setShowConfirmModal(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar la nota", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-full">
        <div className="card-body">
          <h2 className="card-title text-accent font-bold lg:text-2xl">
            {title}
          </h2>
          <p className="text-amber-50">{description}</p>
          <div className="flex justify-between items-center mt-6">
            <time dateTime={date}>{date}</time>
            <div className="flex gap-4">
              <SquarePen
                className="text-white cursor-pointer"
                onClick={() => navigate(`/editNote/${id}`)}
              ></SquarePen>
              <Trash
                onClick={() => setShowConfirmModal(true)}
                className="text-red-400 cursor-pointer"
              ></Trash>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <DeleteConfirmationModal
          title={title}
          deleteNote={deleteNote}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </>
  );
};

export default CardNote;
