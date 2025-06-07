const Footer = () => {
  const footerLinks = [
    { href: '#', title: 'Nossa História' },
    { href: '#', title: 'Missão e Valores' },
    { href: '#', title: 'Sustentabilidade' },
  ]
  const socialIcons = [
    { href: '#', title: 'Instagram', icon: 'fa-instagram' },
    { href: '#', title: 'Facebook', icon: 'fa-facebook' },
    { href: '#', title: 'Whatsapp', icon: 'fa-whatsapp' },
  ]
  return (
    <footer>
      <div class='footer-content'>
        <div class='footer-brand'>
          <div class='footer-logo'>
            <h2>🌼 Flor do Campo</h2>
            <p>Produtos naturais para uma vida mais saudável</p>
          </div>
        </div>

        <div class='footer-links'>
          <h3>Sobre Nós</h3>
          <ul>
            {footerLinks.map((link) => (
              <li>
                <a href={link.href}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div class='footer-info'>
          <h3>Políticas</h3>
          <ul>
            <li>
              <a href='#'>Termos de Uso</a>
            </li>
            <li>
              <a href='#'>Privacidade</a>
            </li>
            <li>
              <a href='#'>FAQ</a>
            </li>
            <li>
              <a href='#'>Entregas</a>
            </li>
          </ul>
        </div>

        <div class='footer-social'>
          <h3>Contato</h3>
          <div class='footer-contato'>
            <a href='tel:+558330000000'>
              <i class='fas fa-phone'></i>
              (83) 3000-0000
            </a>
            <a href='mailto:contato@flordocampo.com'>
              <i class='fas fa-envelope'></i>
              contato@flordocampo.com
            </a>
          </div>
          <div class='social-icons'>
            {socialIcons.map((social) => (
              <li>
                <a href={social.href}>
                  <i className={`fab ${social.icon}`}>{social.title}</i>
                </a>
              </li>
            ))}
          </div>
        </div>
      </div>
      <div class='footer-map'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.9711727941094!2d-34.8766422!3d-7.1356977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace810852ae4f1%3A0xaf5445223401f2bb!2sIFPB%20-%20Campus%20Jo%C3%A3o%20Pessoa!5e0!3m2!1spt-BR!2sbr!4v1659642415261!5m2!1spt-BR!2sbr'
          style='border:0;'
          allowfullscreen=''
          loading='lazy'
        ></iframe>
      </div>
      <div class='footer-payments'>
        <h3>Aceitamos:</h3>
        <div class='payment-icons'>
          <i
            class='fab fa-cc-visa'
            title='Visa'
          ></i>
          <i
            class='fab fa-cc-mastercard'
            title='Mastercard'
          ></i>
          <i
            class='fab fa-cc-amex'
            title='American Express'
          ></i>
          <i
            class='fas fa-barcode'
            title='Boleto'
          ></i>
          <i
            class='fas fa-qrcode'
            title='PIX'
          ></i>
        </div>
      </div>
    </footer>
  )
}

export default Footer
