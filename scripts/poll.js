window.onload = init;

function set_visible(el) {
  el.style.display = 'none';
}

function set_invisible(el) {
  el.style.display = 'block';
}

function invisibleIfChecked(id, hideClass) {
  invisibleIfVal(id, function (t) { return t.checked; }, hideClass);
}

function visibleIfChecked(id, dispClass) {
  visibleIfVal(id, function (t) { return t.checked; }, dispClass);
}

function invisibleIfVal(id, check_fct, hideClass) {
  console.log("Add event listener for %s, hide questions %s", id, hideClass);
  add_change_evt(document.getElementById(id), function (evt) {
    if (check_fct(evt.target)) {
      for (q of document.getElementsByClassName(hideClass)) {
        set_invisible(q);
      }
    }
  });
}

function visibleIfVal(id, check_fct, dispClass) {
  console.log("Add event listener for %s, display questions %s", id, dispClass);
  add_change_evt(document.getElementById(id), function (evt) {
    if (check_fct(evt.target)) {
      for (q of document.getElementsByClassName(dispClass)) {
        set_visible(q);
      }
    }
  });
}

function initRangeThreshold(id, min, max, threshold) {
  let arr = Object.entries(threshold).sort((a, b) => {
    if(a[1] > b[1]) return -1;
    if(a[1] < b[1]) return 1;
    return 0
  });

  console.log("ID: %s\nThresholds: %s", id, JSON.stringify(arr));
  var el = document.getElementById(id);
  add_change_evt(el, function (evt) {
    let val = evt.target.value;
    var out = document.getElementById(id + "-value");
    var txt = "";
    for (t of arr) {
      if (val <= t[1]) {
        txt = t[0];
      } else {
        break;
      }
    }
    out.textContent = `${val}/${max} ${txt}`;
  });
}

function add_change_evt(el, handler) {
  var event = new Event('change');
  el.addEventListener("change", handler, false);
  el.dispatchEvent(event);
}

// function set_numeric_pro_visible() {
//   console.log("Numeric pro visible");
//   let not = document.getElementsByClassName("not-numeric");
//   for (q of not) {
//     set_invisible(q);
//   }

//   let pro = document.getElementsByClassName("numeric-pro");
//   for (q of pro) {
//     set_visible(q);
//   }
// }

// function set_not_numeric_pro_visible() {
//   console.log("Not numeric pro visible");
//   let not = document.getElementsByClassName("not-numeric");
//   for (q of not) {
//     set_visible(q);
//   }

//   let pro = document.getElementsByClassName("numeric-pro");
//   for (q of pro) {
//     set_invisible(q);
//   }
// }

// function init_hide_form() {
//   document.getElementById('inp-preli-numeric-or-not-yes').addEventListener("change", function (evt) {
//     set_numeric_pro_visible();
//   }, false);

//   document.getElementById('inp-preli-numeric-or-not-no').addEventListener("change", function (evt) {
//     set_not_numeric_pro_visible();
//   }, false);
// }

// function init_range_value_disp() {
//   document.querySelectorAll("input[type=range]").forEach(inp => {
//     let val = document.getElementById(inp.id + "-value");
//     if (val) {
//       val.textContent = inp.value;
//     }

//     inp.addEventListener("input", (evt) => {
//       let val = document.getElementById(inp.id + "-value");
//       if (val) {
//         val.textContent = evt.target.value;
//       }
//     });
//   });
// }

function get_query(q) {
   return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function init_form_token() {
  let token = get_query("token");
  document.getElementById("save-data-token").value = token;
}

function init() {
  init_form_token();
  init_questions_events();
  // init_hide_form();
  // init_range_value_disp();
}
