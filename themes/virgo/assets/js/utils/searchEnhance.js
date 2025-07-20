// themes/virgo/assets/js/utils/searchEnhance.js

function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }
  
  function autoSearchFromURL() {
    const kw = getQueryParam("q");
    if (!kw) return;
  
    const $input = $("input[type='search'], input[type='text']");
    if ($input.length) {
      $input.val(kw);
      $input.trigger("input").trigger(jQuery.Event("keyup", { key: "Enter" }));
      $("html, body").animate({ scrollTop: $input.offset().top - 100 }, 300);
    }
  }
  
  $(document).ready(autoSearchFromURL);
  