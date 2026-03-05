/* Se esta creando un componente de boton reutilizable en React con TypeScript.
El componente recibe props para configurar el texto, la función onClick 
y el tipo de botón.*/


interface Props {
  text: string; // Texto que aparece en el botón
  onClick?: () => void; // Función que se ejecuta al hacer clic en el botón, es opcional
  type?: "button" | "submit";  // Tipo de botón, por defecto es "button"
}


const Button = ({ text, type = 'button', onClick }: Props) => {
  return (
    <button
      type={type}
      className="auth-button"
      onClick={onClick ? () => onClick() : undefined} // solo lo usa si existe
    >
      {text}
    </button>
  );
};

// Se exporta el componente para poder usarlo en otros archivos
export default Button;