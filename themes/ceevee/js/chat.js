    var accessToken = "ae4d935ce9254670a8c74cfb75eee106",
      baseUrl = "https://api.api.ai/v1/",
      $chatOpen,
      $textInput,
      $sendBtn,
      $queryInput,
      $welcome,
      $resultDiv;
    $(document).ready(function() {
      $textInput = $("#submittext");
      $sendBtn = $("#send");
      $chatOpen = $(".chat");
      $queryInput = document.getElementById("text");
      $resultDiv = document.getElementById("response");
      $textInput.keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          send();
        }
      });
      $sendBtn.on("click", function(event) {
          send();
      });
      $chatOpen.on("click", function(event) {
        event.preventDefault();
        $( "#chatcontainer" ).toggle();
            $(this).parent().addClass('active');
            $textInput.focus();
            if ($welcome!=1) {
              welcome()
            }
      });
    });
    function send() {
      $welcome = 1;
      var query = $textInput.val();
      var result;
      createQueryNode(query);
      var responseNode = createResponseNode();
      $.ajax({
        type: "POST",
        url: baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({query: query, lang: "en", sessionId: "yaydevdiner"}),
        success: function(data) {
          result = data.result.speech
          setResponseOnNode(result, responseNode);
        },
        error: function() {
          result = "Oh no, there has been an internal server error";
		  setResponseOnNode(result, responseNode);
        }
      });
    }
    function createQueryNode() {
    var node = document.createElement('div'),
        query = $textInput.val();
    $textInput.val('');
    node.className = "cf chatquery";
    node.innerHTML = query
    $resultDiv.appendChild(node);
    }
    function createResponseNode() {
    var node = document.createElement('div');
    node.className = "cf chatresponse";
    node.innerHTML = "...";
    $resultDiv.appendChild(node);
    return node;
    }
    function setResponseOnNode(response, node) {
    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);
    var speaking = false;
    }