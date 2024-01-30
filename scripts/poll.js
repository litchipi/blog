window.onload = init;

function set_visible(el) {
  el.style.display = 'none';
}

function set_invisible(el) {
  el.style.display = 'block';
}

function set_numeric_pro_visible() {
  console.log("Numeric pro visible");
  let not = document.getElementsByClassName("not-numeric");
  for (q of not) {
    set_invisible(q);
  }

  let pro = document.getElementsByClassName("numeric-pro");
  for (q of pro) {
    set_visible(q);
  }
}

function set_not_numeric_pro_visible() {
  console.log("Not numeric pro visible");
  let not = document.getElementsByClassName("not-numeric");
  for (q of not) {
    set_visible(q);
  }

  let pro = document.getElementsByClassName("numeric-pro");
  for (q of pro) {
    set_invisible(q);
  }
}

function init_hide_form() {
  document.getElementById("numeric-or-not").style.display = "block";
  if (document.getElementById('inp-preli-numeric-or-not-yes').checked) {
    set_numeric_pro_visible();
  } else if (document.getElementById('inp-preli-numeric-or-not-no').checked) {
    set_not_numeric_pro_visible();
  }

  document.getElementById('inp-preli-numeric-or-not-yes').addEventListener("change", function (evt) {
    set_numeric_pro_visible();
  }, false);

  document.getElementById('inp-preli-numeric-or-not-no').addEventListener("change", function (evt) {
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

function getQuery(q) {
   return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function init_form_token() {
  let token = getQuery("token");
  document.getElementById("save-data-token").value = token;
}

function init() {
  init_form_token();
  init_hide_form();
  init_range_value_disp();
}
