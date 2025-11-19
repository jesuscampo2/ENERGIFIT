
    function enviarFormulario() {
      const email = document.getElementById("email").value;
      const nombre = document.getElementById("nombre").value;
      const acepto = document.getElementById("acepto").checked;

      if (email === "") {
        alert("Por favor, ingresa un email válido.");
        return;
      }

      if (!acepto) {
        alert("Debes aceptar la política de privacidad para continuar.");
        return;
      }

      alert("¡Gracias por suscribirte! 🎉");
    }
