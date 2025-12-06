// Componente reutilizable para campos de entrada (input) en formularios.
// Recibe props para configurar el tipo, placeholder, valor y manejador de cambios.

import React from "react";

interface Props {
  type: string; // Tipo de input (text, password, email, etc.)
  placeholder: string; // Texto que aparece cuando el input está vacío
  value: string; // Valor actual del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Maneja el cambio en el input
}

const InputField = ({ type, placeholder, value, onChange }: Props) => {
  return (
    <input
      type={type} // El tipo de input se define mediante props 
      placeholder={placeholder} // El placeholder también se define mediante props 
      value={value} // El valor del input se controla mediante props
      onChange={onChange} // El evento onChange se maneja mediante props
      className="input-field" 
    />
  );
};
// Se exporta el componente para poder usarlo en otros archivos
export default InputField; 
