import { useState } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  cpf: '',
  dtnasc: '',
  email: '',
  phone: '',
  cep: '',
  street: '',
  state: '',
  city: '',
  sexo: 'masculino',
  contact: [],
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        contact: checked
          ? [...prev.contact, value]
          : prev.contact.filter((item) => item !== value),
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const formatCpf = (value) =>
    value
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  };

  const formatCep = (value) => value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d{0,3})/, '$1-$2');

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'cpf', 'dtnasc', 'email', 'cep', 'street'];
    const missing = requiredFields.filter((field) => !String(form[field]).trim());

    if (
      missing.length > 0 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
      form.cpf.replace(/\D/g, '').length !== 11 ||
      form.cep.replace(/\D/g, '').length !== 8
    ) {
      setMessage({ type: 'error', text: 'Revise os campos obrigatórios e os dados informados.' });
      return;
    }

    setMessage({ type: 'success', text: 'Cadastro realizado com sucesso! Em breve entraremos em contato.' });
    setForm(initialForm);
  };

  return (
    <main id="page-shell" className="page-shell">
      <section id="hero-card" className="hero-card">
        <div id="hero-copy" className="hero-copy">
          <div className="hero-badge-row">
            <span className="pill">Saúde integral</span>
            <span className="hero-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3.5c1.9 0 3.4 1.5 3.4 3.3v1.1h1.4c1.8 0 3.2 1.4 3.2 3.1v3.6c0 1.7-1.4 3.1-3.2 3.1h-1.4v1.1c0 1.8-1.5 3.3-3.4 3.3s-3.4-1.5-3.4-3.3v-1.1H7.2c-1.8 0-3.2-1.4-3.2-3.1V11c0-1.7 1.4-3.1 3.2-3.1h1.4V6.8c0-1.8 1.5-3.3 3.4-3.3Z" fill="currentColor"/>
                <path d="M12 8.2v7.6M8.5 11.9h7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </span>
          </div>

          <h1 id="hero-title">Cadastro SaúdeAmiga</h1>
          <p id="hero-description">
            Crie sua conta com praticidade, segurança e uma experiência acolhedora, pensada para cuidar do seu bem-estar desde o primeiro passo.
          </p>

          <div className="hero-highlight-grid">
            <div className="highlight-card">
              <strong>Atendimento humano</strong>
              <span>Suporte próximo e personalizado.</span>
            </div>
            <div className="highlight-card">
              <strong>Dados protegidos</strong>
              <span>Privacidade e segurança em cada etapa.</span>
            </div>
          </div>

          <ul id="benefits-list" className="benefits">
            <li><span>✓</span> Processo simples e guiado</li>
            <li><span>✓</span> Validação de campos em tempo real</li>
            <li><span>✓</span> Comunicação clara e segura</li>
          </ul>
        </div>

        <form id="signupForm" className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h2>Dados do cadastro</h2>
            <p>Preencha as informações abaixo para criar sua conta.</p>
          </div>

          <div id="formMessage" className={`form-message ${message.type}`} aria-live="polite">
            {message.text}
          </div>

          <div className="input-grid">
            <div className="field">
              <label htmlFor="firstName">Nome</label>
              <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Seu nome" required />
            </div>
            <div className="field">
              <label htmlFor="lastName">Sobrenome</label>
              <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Seu sobrenome" required />
            </div>
          </div>

          <div className="input-grid">
            <div className="field">
              <label htmlFor="cpf">CPF</label>
              <input id="cpf" name="cpf" value={form.cpf} onChange={(e) => setForm((prev) => ({ ...prev, cpf: formatCpf(e.target.value) }))} placeholder="000.000.000-00" required />
            </div>
            <div className="field">
              <label htmlFor="dtnasc">Data de nascimento</label>
              <input id="dtnasc" name="dtnasc" type="date" value={form.dtnasc} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-grid">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Telefone</label>
              <input id="phone" name="phone" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }))} placeholder="(11) 99999-9999" />
            </div>
          </div>

          <div className="input-grid">
            <div className="field">
              <label htmlFor="cep">CEP</label>
              <input id="cep" name="cep" value={form.cep} onChange={(e) => setForm((prev) => ({ ...prev, cep: formatCep(e.target.value) }))} placeholder="00000-000" required />
            </div>
            <div className="field">
              <label htmlFor="street">Endereço</label>
              <input id="street" name="street" value={form.street} onChange={handleChange} placeholder="Rua, número e complemento" required />
            </div>
          </div>

          <div className="input-grid">
            <div className="field">
              <label htmlFor="state">Estado</label>
              <select id="state" name="state" value={form.state} onChange={handleChange}>
                <option value="">Selecione o estado</option>
                <option value="PE">Pernambuco</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="SC">Santa Catarina</option>
                <option value="BA">Bahia</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select id="city" name="city" value={form.city} onChange={handleChange}>
                <option value="">Selecione a cidade</option>
                <option value="Recife">Recife</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Porto Alegre">Porto Alegre</option>
                <option value="Florianópolis">Florianópolis</option>
                <option value="Salvador">Salvador</option>
              </select>
            </div>
          </div>

          <fieldset id="sexo-fieldset" className="fieldset">
            <legend id="sexo-legend">Sexo</legend>
            <div className="radio-group">
              <label><input type="radio" name="sexo" value="masculino" checked={form.sexo === 'masculino'} onChange={handleChange} /> Masculino</label>
              <label><input type="radio" name="sexo" value="feminino" checked={form.sexo === 'feminino'} onChange={handleChange} /> Feminino</label>
              <label><input type="radio" name="sexo" value="nao-informar" checked={form.sexo === 'nao-informar'} onChange={handleChange} /> Prefiro não informar</label>
            </div>
          </fieldset>

          <fieldset id="contact-fieldset" className="fieldset">
            <legend id="contact-legend">Canal preferido para contato</legend>
            <div className="checkbox-group">
              <label><input type="checkbox" name="contact" value="email" checked={form.contact.includes('email')} onChange={handleChange} /> E-mail</label>
              <label><input type="checkbox" name="contact" value="phone" checked={form.contact.includes('phone')} onChange={handleChange} /> Telefone</label>
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="fileUpload">Documento de identificação</label>
            <input id="fileUpload" name="fileUpload" type="file" />
          </div>

          <button id="submit-button" type="submit" className="submit-btn">Enviar cadastro</button>

          <p id="privacy-link" className="privacy-link">
            <a href="privacy.html" target="_blank" rel="noreferrer">Política de privacidade</a>
          </p>
        </form>
      </section>
    </main>
  );
}

export default App;
