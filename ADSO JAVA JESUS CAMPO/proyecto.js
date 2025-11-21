
    let med1Stock = 0;
    let med2Stock = 0;
    let totalPacientes = 0;
    let pacientesMed1 = 0;
    let pacientesMed2 = 0;
    let iniciado = false;

    function atenderPaciente() {
      const sistolica = parseInt(document.getElementById("sistolica").value);
      const diastolica = parseInt(document.getElementById("diastolica").value);

      if (isNaN(sistolica) || isNaN(diastolica)) {
        alert("Por favor ingresa valores válidos de presión.");
        return;
      }

      if (!iniciado) {
        med1Stock = parseInt(document.getElementById("med1").value);
        med2Stock = parseInt(document.getElementById("med2").value);
        if (isNaN(med1Stock) || isNaN(med2Stock)) {
          alert("Ingresa existencias válidas antes de atender pacientes.");
          return;
        }
        iniciado = true;
      }

      if (med1Stock <= 0 || med2Stock <= 0) {
        alert("Se acabaron las existencias de algún medicamento.");
        return;
      }

      totalPacientes++;
      let tipo = 0;
      let dosis = 0;
      let categoria = "Sin clasificar";

      if (sistolica < 69 && diastolica < 48) {
        tipo = 2; dosis = 6; categoria = "hipotension";
      } else if (69 <= sistolica && sistolica < 98 && 48 <= diastolica && diastolica < 66) {
        tipo = 0; dosis = 0; categoria = "optima";
      } else if (98 <= sistolica && sistolica < 143 && 66 <= diastolica && diastolica < 92) {
        tipo = 0; dosis = 0; categoria = "comun";
      } else if (143 <= sistolica && sistolica < 177 && 92 <= diastolica && diastolica < 124) {
        tipo = 1; dosis = 6; categoria = "pre HTA";
      } else if (177 <= sistolica && sistolica < 198 && 124 <= diastolica && diastolica < 142) {
        tipo = 1; dosis = 10; categoria = "HTAG1";
      } else if (198 <= sistolica && sistolica < 246 && 142 <= diastolica && diastolica < 169) {
        tipo = 1; dosis = 18; categoria = "HTAG2";
      } else if (sistolica >= 246 && diastolica >= 169) {
        tipo = 1; dosis = 35; categoria = "HTAG3";
      } else if (sistolica >= 162 && diastolica < 86) {
        tipo = 1; dosis = 17; categoria = "HTASS";
      }

      let entrega = "No se entrega medicamento";

      if (tipo === 1 && med1Stock >= dosis) {
        med1Stock -= dosis;
        pacientesMed1++;
        entrega = `Se entrega medicamento 1 (${dosis} dosis)`;
      } else if (tipo === 2 && med2Stock >= dosis) {
        med2Stock -= dosis;
        pacientesMed2++;
        entrega = `Se entrega medicamento 2 (${dosis} dosis)`;
      }

      document.getElementById("output").innerHTML = `
        <p><strong>Paciente ${totalPacientes}</strong></p>
        <p>Categoría: ${categoria}</p>
        <p>${entrega}</p>
        <p>Existencias restantes - Medicamento 1: ${med1Stock}, Medicamento 2: ${med2Stock}</p>
      `;
    }

    function mostrarResultados() {
      let porc1 = totalPacientes === 0 ? 0 : (pacientesMed1 / totalPacientes) * 100;
      let porc2 = totalPacientes === 0 ? 0 : (pacientesMed2 / totalPacientes) * 100;

      document.getElementById("output").innerHTML = `
        <p><strong>Resumen final</strong></p>
        <p>Total pacientes: ${totalPacientes}</p>
        <p>Medicamento 1: ${pacientesMed1} (${porc1.toFixed(2)}%)</p>
        <p>Medicamento 2: ${pacientesMed2} (${porc2.toFixed(2)}%)</p>
      `;
    }
