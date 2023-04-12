import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import styles from "./Donations.module.css";

export default function Donations() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={`${styles["container"]}`}>
      <section className={`${styles["data-container"]}`}>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>50</p>
          <p className={`${styles["text"]}`}>Donaciones de Marzo</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>10.000</p>
          <p className={`${styles["text"]}`}>Total ARS de Marzo</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>500</p>
          <p className={`${styles["text"]}`}>Total USD de Marzo</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>8.000</p>
          <p className={`${styles["text"]}`}>Total ARS de Febrero</p>
        </div>
        <div className={`${styles["data"]}`}>
          <p className={`${styles["value"]}`}>700</p>
          <p className={`${styles["text"]}`}>Total USD de Febrero</p>
        </div>
      </section>
      <form className={`${styles["form"]}`}>
        <div className={`${styles["select-container"]}`}>
          <label htmlFor='status'>Mostrar:</label>
          <select className={`${styles["select"]}`} name='status' id='status'>
            <option value='active'>Donaciones aprobadas</option>
            <option value='inactive'>Donaciones canceladas</option>
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
              Importe{" "}
              <button className={`${styles["button"]} ${styles["arrow"]}`}>
                <FiChevronDown className='white-icon' size='1.45rem' />
              </button>
            </th>
            <th>
              Moneda{" "}
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
            <td className={`${styles["amount"]}`} title='1.000'>
              1.000
            </td>
            <td className={`${styles["iso"]}`} title='ARS'>
              ARS
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
            <td className={`${styles["amount"]}`} title='1.000'>
              1.000
            </td>
            <td className={`${styles["iso"]}`} title='ARS'>
              ARS
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
            <td className={`${styles["amount"]}`} title='1.000'>
              1.000
            </td>
            <td className={`${styles["iso"]}`} title='ARS'>
              ARS
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
            <td className={`${styles["amount"]}`} title='1.000'>
              1.000
            </td>
            <td className={`${styles["iso"]}`} title='ARS'>
              ARS
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
