// Active Link
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

/* Start Count Stats */
document.addEventListener("DOMContentLoaded", () => {
  const nums = document.querySelectorAll(".stats .number");
  const stats = document.querySelector(".stats");
  if (!nums.length || !stats) return;

  const startCount = (el) => {
    const goal = parseInt(el.dataset.goal, 10) || 0;
    let current = 0;
    const duration = 1400;
    const stepTime = Math.max(Math.floor(duration / Math.max(goal, 1)), 10);
    const step = Math.ceil(goal / (duration / stepTime));

    const timer = setInterval(() => {
      current += step;
      if (current >= goal) {
        el.textContent = goal;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, stepTime);
  };

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nums.forEach(startCount);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  io.observe(stats);
});

// Scoll Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* Start Validation Forms  */
const form = document.getElementById("form");

// Tous les champs du formulaire
const fields = {
  lastName: "Champ Obligatoire",
  firstName: "Champ Obligatoire",
  lastNameParent: "Champ Obligatoire",
  firstNameParent: "Champ Obligatoire",
  birthday: "Champ Obligatoire",
  email: { required: "Champ Obligatoire", invalid: "Adresse e-mail invalide" },
  mobile: {
    required: "Champ Obligatoire",
    invalid: "Le numéro de téléphone doit comporter 8 numéros",
  },
  address: "Champ Obligatoire",
  country: "Champ Obligatoire",
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

const validateInputs = () => {
  let isFormValid = true;

  Object.keys(fields).forEach((key) => {
    const element = document.getElementById(key);
    const value = element.value.trim();
    const rules = fields[key];

    if (value === "") {
      setError(element, typeof rules === "string" ? rules : rules.required);
      isFormValid = false;
      return;
    }

    if (key === "email" && !isValidEmail(value)) {
      setError(element, rules.invalid);
      isFormValid = false;
      return;
    }

    if (key === "mobile" && value.length !== 8) {
      setError(element, rules.invalid);
      isFormValid = false;
      return;
    }

    setSuccess(element);
  });

  return isFormValid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    console.log("✅ Formulaire valide !");
  }
});
