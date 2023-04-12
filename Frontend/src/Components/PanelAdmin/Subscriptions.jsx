import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Subscriptions.module.css";
import Pagination from "../Pagination/Pagination";

export default function Subscriptions() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={`${styles["container"]}`}>
      <section className={`${styles["data-container"]}`}>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>140</p>
          <p className={`${styles["text"]}`}>Total suscripciones</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>50</p>
          <p className={`${styles["text"]}`}>Total suscripciones de Marzo</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>50</p>
          <p className={`${styles["text"]}`}>Total suscripciones de Febrero</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>40</p>
          <p className={`${styles["text"]}`}>Total suscripciones de Abril</p>
        </div>
      </section>
      <form className={`${styles["form"]}`}>
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
              Nombre{" "}
              <button className={`${styles["button"]} ${styles["arrow"]}`}>
                <FiChevronDown className='white-icon' size='1.45rem' />
              </button>
            </th>
            <th>Correo electrónico</th>
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
            <td className={`${styles["name"]}`} title='Maria Perez'>
              Maria Perez
            </td>
            <td className={`${styles["email"]}`} title='mariaperez@gmail.com'>
              mariaperez@gmail.com
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`button yellow-button ${styles["delete-button"]}`}
              >
                Eliminar
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
            <td className={`${styles["name"]}`} title='Maria Perez'>
              Maria Perez
            </td>
            <td className={`${styles["email"]}`} title='mariaperez@gmail.com'>
              mariaperez@gmail.com
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`button yellow-button ${styles["delete-button"]}`}
              >
                Eliminar
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
            <td className={`${styles["name"]}`} title='Maria Perez'>
              Maria Perez
            </td>
            <td className={`${styles["email"]}`} title='mariaperez@gmail.com'>
              mariaperez@gmail.com
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`button yellow-button ${styles["delete-button"]}`}
              >
                Eliminar
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
            <td className={`${styles["name"]}`} title='Maria Perez'>
              Maria Perez
            </td>
            <td className={`${styles["email"]}`} title='mariaperez@gmail.com'>
              mariaperez@gmail.com
            </td>
            <td className={`${styles["actions"]}`}>
              <button
                className={`button yellow-button ${styles["delete-button"]}`}
              >
                Eliminar
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
