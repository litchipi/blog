window.onload = init;

function set_numeric_pro_visible() {
  console.log("Numeric pro visible");
  let not = document.getElementsByClassName("not-numeric");
  for (q of not) {
    q.style.visibility = 'hidden';
    q.style.height = '0pt';
  }

  let pro = document.getElementsByClassName("numeric-pro");
  for (q of pro) {
    q.style.visibility = 'visible';
    q.style.height = 'unset';
  }
}

function set_not_numeric_pro_visible() {
  console.log("Not numeric pro visible");
  let not = document.getElementsByClassName("not-numeric");
  for (q of not) {
    q.style.visibility = 'visible';
    q.style.height = 'unset';
  }

  let pro = document.getElementsByClassName("numeric-pro");
  for (q of pro) {
    q.style.visibility = 'hidden';
    q.style.height = '0pt';
  }
}

function init_hide_form() {
  if (document.getElementById('inp-numeric-or-not-yes').checked) {
    set_numeric_pro_visible();
  }

  document.getElementById('inp-numeric-or-not-yes').addEventListener("change", function (evt) {
    set_numeric_pro_visible();
  }, false);

  if (document.getElementById('inp-numeric-or-not-no').checked) {
    set_not_numeric_pro_visible();
  }

  document.getElementById('inp-numeric-or-not-no').addEventListener("change", function (evt) {
    set_not_numeric_pro_visible();
  }, false);
}

function init_range_value_disp() {
  document.querySelectorAll("input[type=range]").forEach(inp => {
    let val = document.getElementById(inp.id + "-value");
    if (val) {
      val.textContent = inp.value;
    }

    inp.addEventListener("input", (evt) => {
      let val = document.getElementById(inp.id + "-value");
      if (val) {
        val.textContent = evt.target.value;
      }
    });
  });
}

function init() {
  init_hide_form();
  init_range_value_disp();
}
