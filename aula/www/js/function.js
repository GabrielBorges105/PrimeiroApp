document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady(){
                var db = window.openDatabase("Database","1.0","BancoVAO",2000000);
                db.transaction(populateDB, errorCB, successCB);
            }
            function populateDB(tx){
                tx.executeSql('DROP TABLE IF EXISTS animVAO');
                tx.executeSql('CREATE TABLE animVAO(id INTEGER PRIMARY KEY ASC, animes)');
                tx.executeSql('INSERT  INTO animVAO(id, animes) VALUES(1,"https://www.blogger.com/video-play.mp4?contentId=1e2d5b3167d47567")');
                //tx.executeSql('INSERT INTO animVAO(id, animes) VALUES(2,"https://www.blogger.com/video-play.mp4?contentId=1e2d5b3167d47567")');
            }
            function errorCB(err){
                alert("erro: "+err.code)
            }
            function successCB(){
                alert("Sucesso");
            }

            function show(){
                var db = window.openDatabase("Database","1.0","BancoVAO",2000000);
                db.transaction(queryDB,errorCB)
            }
            function queryDB(tx){
                tx.executeSql('SELECT * FROM animVAO', [], querySuccess , errorCB)
            }
            function querySuccess(tx, results){
                var len = results.rows.length;
                alert(len+" linhas encontradas");
                for (var i = 0; i<len; i++) {
                    //alert("ID: "+results.rows.item(i).id + " Link: "+results.rows.item(i).animes);
                    document.getElementById('aparece2').innerHTML += "<br>ID: "+results.rows.item(i).id + " <video width='320' height='240' controls><source src='"+results.rows.item(i).animes+"' type='video/mp4'Your browser does not support the video tag.</video>";
                }
            }
            function adicionar(){
                alert("entrou no adiciona");
                var db = window.openDatabase("Database","1.0","BancoVAO",2000000);
                db.transaction(function(transaction){
                    transaction.executeSql('INSERT  INTO animVAO(animes) VALUES(?)',[$('#link').val()], successCB, errorCB);
                })
            }
            function login(){

            }
            function deletar(){
                var db = window.openDatabase("Database","1.0","BancoVAO",2000000);
                db.transaction(function(transaction){
                    transaction.executeSql('DELETE FROM animVAO WHERE id = (?)',[$('#idAnim').val()], successCB, errorCB);
                })
            }
            function esconder(){
                document.getElementById('aparece').innerHTML = "";
            }

            function ativaPage(){
                $('.targetPage').click(function(){
                    var target = $(this).attr('dt-page');
                    $('.page').removeClass('page-active');
                    $(target).addClass('page-active');
                });
            }
            ativaPage();