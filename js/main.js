 if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

// ============ LOGIN ============ //
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const user = localStorage.getItem(email);

    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(parsedUser)); 
        window.location.href = "index.html";
      } else {
        alert("Incorrect password");
      }
    } else {
      alert("User not found");
    }
  });
}

// ============ WELCOME PAGE ============ //
if (document.getElementById("welcomeMessage")) {
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    const parsedUser = JSON.parse(user);
    document.getElementById("welcomeMessage").innerHTML =
      `Hello, <strong>${parsedUser.firstName}</strong>!`;
    document.getElementById("logoutButton").classList.remove("hidden");
  } else {
    document.getElementById("welcomeMessage").innerHTML =
      `Hello, please <a href='login.html' style="color:#294D4A; font-weight:bold;">login</a>.`;
  }

  document.getElementById("logoutButton")?.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
}