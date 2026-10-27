const footerHtml = `
  <footer class="site-footer">
    <div class="container footer-grid">

      <div class="footer-about">
        <a class="brand footer-brand" href="index.html">
          <img
            src="assets/logo.png"
            alt="شعار Codly Academy"
            class="brand-logo"
            onerror="this.style.display='none';this.nextElementSibling.style.display='inline-flex'"
          >
          <span class="brand-fallback">
            CODLY<span>ACADEMY</span>
          </span>
        </a>

        <p>نتعلم، نبتكر، ونبني المستقبل من خلال البرمجة والتكنولوجيا.</p>
      </div>

      <div>
        <h3>روابط سريعة</h3>
        <a href="index.html">الرئيسية</a>
        <a href="about.html">عن الأكاديمية</a>
        <a href="#courses">الكورسات</a>
        <a href="videos.html">مكتبة الفيديوهات</a>
      </div>

      <div>
        <h3>تواصل معانا</h3>

        <a href="https://wa.me/201070014108"
           target="_blank" rel="noopener noreferrer">واتساب</a>

        <a href="https://www.facebook.com/profile.php?id=61578089918422"
           target="_blank" rel="noopener noreferrer">Facebook</a>

        <!-- Instagram -->
        <!-- <a href="https://www.instagram.com/codly202/"
             target="_blank" rel="noopener noreferrer">Instagram</a> -->
      </div>

    </div>

    <div class="container footer-bottom">
      <span>© <span data-year></span> Codly Academy. جميع الحقوق محفوظة.</span>
      <span>تعلم اليوم، واصنع الغد.</span>
    </div>
  </footer>
`;

document.getElementById("footer").innerHTML = footerHtml;
