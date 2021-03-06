$(function() {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '150px' });
  
    // client.get('ticket.requester.id').then(
    //   function(data) {
    //     var user_id = data['ticket.requester.id'];
    //     requestUserInfo(client, user_id);
    //   }
    // );

    requestUserInfo(client)
  
  });


  function getToken(client) {
    /* var auth = {
         url: 'http://localhost:3000/api/login',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
         body: JSON.stringify({
             "username": "user", 
             "password": "password"
         })
     }*/
     var auth = {
         url: 'http://localhost:3000/api/login',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           type: 'POST'
     }
     var token = ''
      client.request(auth).then(
      function (data ) {
             token = data.access_token
             console.log(token)
         }
     )
     
 }
  
  
  function requestUserInfo(client) {
    var settings = {
        url: 'http://localhost:3000/api/user',
        headers: { "Authorization": `Bearer ${getToken(client)}` },
        type: 'GET',
        dataType: 'json'
    }
    client.request(settings).then(
        function (data) {
            showInfo(data);
            console.log(data);
        },
        function (response) {
            console.log(response);
            // showError(response);
        }
    );
  }

//   function requestUserInfo(client, id) {
//     var settings = {
//       url: '/api/v2/users/' + id + '.json',
//       type:'GET',
//       dataType: 'json',
//     };
  
//     client.request(settings).then(
//       function(data) {
//         showInfo(data);
//       },
//       function(response) {
//         showError(response);
//       }
//     );
//   }
  
  
  function showInfo(data) {
    var requester_data = {
    //   'name': data.user.name,
    //   'tags': data.user.tags,
    //   'created_at': formatDate(data.user.created_at),
    //   'last_login_at': formatDate(data.user.last_login_at)
    'documentNumber': data.document_number,
    'name': data.name,
    'birth': data.birth, 
    'status': data.status
    
    };
  
    var source = $("#requester-template").html();
    var template = Handlebars.compile(source);
    var html = template(requester_data);
    $("#content").html(html);
  }
  
  
  function showError(response) {
    var error_data = {
      'status': response.status,
      'statusText': response.statusText
    };
    var source = $("#error-template").html();
    var template = Handlebars.compile(source);
    var html = template(error_data);
    $("#content").html(html);
  }
  
  
  function formatDate(date) {
    var cdate = new Date(date);
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    date = cdate.toLocaleDateString("en-us", options);
    return date;
  }