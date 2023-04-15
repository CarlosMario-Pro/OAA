import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import styles from "./RadioProgram.module.css";
import { useNavigate } from "react-router-dom";

export default function RadioProgram() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const editHandler = () => {
    navigate("/panel-admin/radio-program-form");
  };

  const deleteHandler = () => {};
  return (
    <div className={`${styles["container"]}`}>
      <form className={`${styles["form"]}`}>
        <button className={`button yellow-button ${styles["create-button"]}`}>
          Agregar nueva transmisión
        </button>
        <div className={`${styles["select-container"]}`}>
          <label htmlFor='status'>Mostrar:</label>
          <select className={`${styles["select"]}`} name='status' id='status'>
            <option value='active'>Transmisiones activas</option>
            <option value='inactive'>Transmisiones inactivas</option>
          </select>
        </div>
        <div>
          <input
            className='search-input'
            type='search'
            name='search'
            placeholder='Buscar...'
            autoComplete='off'
          />
          <button className={`${styles["button"]}`}>
            <BiSearch className='blue-icon' size='1.25rem' />
          </button>
        </div>
      </form>
      <table className={`${styles["table"]}`}>
        <thead className={`${styles["thead"]}`}>
          <tr>
            <th>ID</th>
            <th>
              Fecha{" "}
              <button className={`${styles["button"]} ${styles["arrow"]}`}>
                <FiChevronDown className='white-icon' size='1.45rem' />
              </button>
            </th>
            <th>
              Título{" "}
              <button className={`${styles["button"]} ${styles["arrow"]}`}>
                <FiChevronDown className='white-icon' size='1.45rem' />
              </button>
            </th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className={`${styles["tbody"]}`}>
          <tr>
            <td className={`${styles["id"]}`} title='642d9426474720c74082f3c5'>
              642d9426474720c74082f3c5
            </td>
            <td className={`${styles["date"]}`} title='01/02/23'>
              01/02/23
            </td>
            <td
              className={`${styles["title"]}`}
              title='Este es el título de la transmisión'
            >
              Este es el título de la transmisión
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`${styles["button"]} ${styles["button-left"]}`}
                onClick={editHandler}
              >
                <MdEdit className='blue-icon' size='1.5rem' />
              </button>
              <button
                className={`${styles["button"]} ${styles["button-right"]}`}
                onClick={deleteHandler}
              >
                <MdDelete className='blue-icon' size='1.5rem' />
              </button>
            </td>
          </tr>
          <tr>
            <td className={`${styles["id"]}`} title='642d9426474720c74082f3c5'>
              642d9426474720c74082f3c5
            </td>
            <td className={`${styles["date"]}`} title='01/02/23'>
              01/02/23
            </td>
            <td
              className={`${styles["title"]}`}
              title='Este es el título de la transmisión'
            >
              Este es el título de la transmisión
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`${styles["button"]} ${styles["button-left"]}`}
              >
                <MdEdit className='blue-icon' size='1.5rem' />
              </button>
              <button
                className={`${styles["button"]} ${styles["button-right"]}`}
              >
                <MdDelete className='blue-icon' size='1.5rem' />
              </button>
            </td>
          </tr>
          <tr>
            <td className={`${styles["id"]}`} title='642d9426474720c74082f3c5'>
              642d9426474720c74082f3c5
            </td>
            <td className={`${styles["date"]}`} title='01/02/23'>
              01/02/23
            </td>
            <td
              className={`${styles["title"]}`}
              title='Este es el título de la transmisión'
            >
              Este es el título de la transmisión
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`${styles["button"]} ${styles["button-left"]}`}
              >
                <MdEdit className='blue-icon' size='1.5rem' />
              </button>
              <button
                className={`${styles["button"]} ${styles["button-right"]}`}
              >
                <MdDelete className='blue-icon' size='1.5rem' />
              </button>
            </td>
          </tr>
          <tr>
            <td className={`${styles["id"]}`} title='642d9426474720c74082f3c5'>
              642d9426474720c74082f3c5
            </td>
            <td className={`${styles["date"]}`} title='01/02/23'>
              01/02/23
            </td>
            <td
              className={`${styles["title"]}`}
              title='Este es el título de la transmisión'
            >
              Este es el título de la transmisión
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`${styles["button"]} ${styles["button-left"]}`}
              >
                <MdEdit className='blue-icon' size='1.5rem' />
              </button>
              <button
                className={`${styles["button"]} ${styles["button-right"]}`}
              >
                <MdDelete className='blue-icon' size='1.5rem' />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        numberOfItems='30'
        numberPerPage='7'
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
