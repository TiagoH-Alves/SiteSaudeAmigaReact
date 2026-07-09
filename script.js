const form = document.getElementById('signupForm');
const messageBox = document.getElementById('formMessage');

const cpfInput = document.getElementById('cpf');
const phoneInput = document.getElementById('phone');
const cepInput = document.getElementById('cep');

function showMessage(type, text) {
  messageBox.className = `form-message ${type}`;
  messageBox.textContent = text;
}

function formatCpf(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
}

function formatCep(value) {
  return value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d{0,3})/, '$1-$2');
}

cpfInput.addEventListener('input', (event) => {
  event.target.value = formatCpf(event.target.value);
});

phoneInput.addEventListener('input', (event) => {
  event.target.value = formatPhone(event.target.value);
});

cepInput.addEventListener('input', (event) => {
  event.target.value = formatCep(event.target.value);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const requiredFields = [
    'firstName',
    'lastName',
    'cpf',
    'dtnasc',
    'email',
    'cep',
    'street',
  ];

  const values = {};
  let hasError = false;
  const missing = [];

  requiredFields.forEach((field) => {
    const input = form.elements[field];
    const value = input.value.trim();
    values[field] = value;
    if (!value) {
      missing.push(input.labels[0]?.textContent || field);
      hasError = true;
    }
  });

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    hasError = true;
    missing.push('E-mail inválido');
  }

  if (values.cpf && values.cpf.replace(/\D/g, '').length !== 11) {
    hasError = true;
    missing.push('CPF incompleto');
  }

  if (values.cep && values.cep.replace(/\D/g, '').length !== 8) {
    hasError = true;
    missing.push('CEP incompleto');
  }

  const birthDate = new Date(values.dtnasc);
  if (values.dtnasc && birthDate > new Date()) {
    hasError = true;
    missing.push('Data de nascimento inválida');
  }

  if (hasError) {
    showMessage('error', `Por favor, revise os campos: ${missing.join(', ')}.`);
    return;
  }

  showMessage('success', 'Cadastro realizado com sucesso! Em breve entraremos em contato.');
  form.reset();
});
