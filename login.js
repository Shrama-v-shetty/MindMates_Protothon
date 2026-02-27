let selectedRole = "citizen";

const citizenBtn = document.getElementById("citizenBtn");
const hospitalBtn = document.getElementById("hospitalBtn");
const loginBtn = document.getElementById("loginBtn");
const anonBtn = document.getElementById("anonBtn");

/* ================= ROLE SELECTION ================= */
citizenBtn.addEventListener("click", () => {
  selectedRole = "citizen";
});

hospitalBtn.addEventListener("click", () => {
  selectedRole = "hospital";
});

/* ================= LOGIN ================= */
loginBtn.addEventListener("click", async () => {
  try {
    let payload = { role: selectedRole };

    if (selectedRole === "citizen") {
      payload.email = document.getElementById("emailCitizen").value;
      payload.password = document.getElementById("passwordCitizen").value;
    }

    if (selectedRole === "hospital") {
      payload.email = document.getElementById("emailHospital").value;
      payload.password = document.getElementById("passwordHospital").value;
      payload.hospitalId = document.getElementById("hospitalID").value;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Redirect based on role
    if (data.user.role === "hospital") {
      window.location.href = "hospitalDashboard.html";
    } else {
      window.location.href = "citizenDashboard.html";
    }

  } catch (err) {
    alert("Server error");
    console.error(err);
  }
});

/* ================= ANONYMOUS ================= */
anonBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "anonymous" }),
    });
  throw new Error("Network response was not ok");
    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    window.location.href = "citizenDashboard.html";
  } catch (err) {
    console.error(err); 
    alert("Server error");
  }

});
