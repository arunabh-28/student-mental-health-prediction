
const API_URL =
  window.location.port === "5500"
    ? "http://127.0.0.1:8000"
    : "";

const form = document.getElementById("predict-form");
const submitBtn = document.getElementById("submit-btn");
const scoreEl = document.getElementById("score");
const markerEl = document.getElementById("marker");
const verdictEl = document.getElementById("verdict");
const errorEl = document.getElementById("error");

const numericFields = {
  Age: "int",
  Avg_Daily_Usage_Hours: "float",
  Daily_Unlocks: "int",
  Study_Hours: "float",
  Sleep_Hours_Per_Night: "float",
  Physical_Activity_Hours: "float",
};

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function clearError() {
  errorEl.hidden = true;
  errorEl.textContent = "";
}

function fillSelect(name, values) {
  const select = form.elements[name];
  select.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

async function loadOptions() {
  try {
    const response = await fetch(`${API_URL}/options`);
    if (!response.ok) throw new Error();
    const options = await response.json();
    Object.entries(options).forEach(([name, values]) => fillSelect(name, values));
  } catch {
    showError("Could not load the form options. Check that the API is running.");
    submitBtn.disabled = true;
  }
}

function describe(score) {
  if (score >= 7.5) return "Doing well. Habits point to a healthy score.";
  if (score >= 5.5) return "Moderate. Some habits may be worth adjusting.";
  return "Low. Habits point to a lower score, so extra support may help.";
}

function readPayload() {
  const payload = {};
  Array.from(form.elements).forEach((el) => {
    if (!el.name) return;
    const kind = numericFields[el.name];
    if (kind === "int") payload[el.name] = parseInt(el.value, 10);
    else if (kind === "float") payload[el.name] = parseFloat(el.value);
    else payload[el.name] = el.value;
  });
  return payload;
}

function formatApiError(detail) {
  if (Array.isArray(detail)) {
    return detail.map((d) => `${d.loc[d.loc.length - 1]}: ${d.msg}`).join("; ");
  }
  return detail || "Something went wrong.";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Estimating…";

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readPayload()),
    });
    const data = await response.json();
    if (!response.ok) {
      showError(formatApiError(data.detail));
      return;
    }
    const score = data.mental_health_score;
    scoreEl.textContent = score.toFixed(1);
    markerEl.style.left = `${(score / 10) * 100}%`;
    markerEl.hidden = false;
    verdictEl.textContent = describe(score);
  } catch {
    showError("Could not reach the API. Check that the server is running.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Estimate score";
  }
});

loadOptions();
