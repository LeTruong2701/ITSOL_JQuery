$(document).ready(function(){

    


    var DSSV=[];
     $('#save').click(function(e){
        var id = localStorage.getItem("id");
        if (id == null) {
        id = 1;

        }
      
        e.preventDefault();
        var sinhvien={};
        sinhvien.id=id++;
        sinhvien.name=$('#name').val();
        sinhvien.birthday=$('#my_date_picker').val();
        sinhvien.mobilephone=$('#mobilephone').val();
        sinhvien.hometown=$('#hometown').val();
        DSSV.push(sinhvien);
        LuuDuLieu(DSSV);
        LoadDSSV();
        alert('Them Sinh Vien thanh cong');

        $('#name').val('');
        $('#my_date_picker').val('');
        $('#mobilephone').val('');
        $('#hometown').val('');
        
        localStorage.setItem("id", id);

        var name = $("#name").val();
        var birthday = $("#my_date_picker").val();
        var phone = $("#mobilephone").val();
        var hometown = $("#hometown").val();
        var idStudent = $("#id_student").val();

        if (idStudent != 0) {
            var sinhvien = {
                id: idStudent,
                name,
                birthday,
                phone,
                hometown
            }
            updateStudent(sinhvien);
            LoadDSSV();
            LoadDuLieu();
            return;
        }
    
        

    })

    $('#reset').click(function(){
            $('#name').val('');
            $('#my_date_picker').val('');
            $('#mobilephone').val('');
            $('#hometown').val('');
        })


    function LuuDuLieu(){
        
        if(localStorage){
            localStorage.setItem('dssv',JSON.stringify(DSSV));
        }
    }

    function LoadDuLieu(){
        if(localStorage){
            try{
                dssv=localStorage.getItem('dssv');
                if(dssv){
                    DSSV=JSON.parse(dssv);
                }
            }catch{
                console.log("Xay ra loi")
            }
        }
    }
    function LoadDSSV(){
        
        let dssv = JSON.parse(localStorage.getItem("dssv"));
            
        $('#dssv tr:not(:first)').remove();
        dssv.forEach(e => {
            let data = "<tr> <td>" + "<input value=" + e.id + " class=\"dssv-checkbox\" type=\"checkbox\">"
                + "</td> <td>" + e.name + "</td> <td>" +
                e.birthday + "</td> <td>" + e.mobilephone + "</td> <td>" + e.hometown + "</td> </tr>"
            $("#dssv").append(data);
        });

            $('input.checkbox').click(function(){
                console.log($(this).attr('avc'));
            })
        }

        $('#reset').click(function(){
            $('#name').val('');
            $('#my_date_picker').val('');
            $('#mobilephone').val('');
            $('#hometown').val('');
            
        })
        
        LoadDuLieu();
        LoadDSSV();


        $("#delete").click(function () {
            if (!confirm("Xác nhận muốn xóa")) {
                return;
            }
            var list = JSON.parse(localStorage.getItem("dssv"));
            if (list == null) {
                alert("Danh sach trong")
                return;
            }
            $("#dssv input:checked").each(function () {
                deleteStudent($(this).val(), list)
                console.log($(this).val());
                console.log(list);
            })
            
            LoadDuLieu();
            LoadDSSV();
        });

        function deleteStudent(id, list) {
            let n = list.length;
            for (let i = 0; i < n; i++) {
                let a = i + 1;
            
                if (list[i].id == id) {
                    list.splice(i, a);
                    n = list.length;
                }
               
            }
            localStorage.setItem("dssv", JSON.stringify(list));
            LoadDSSV();
            LoadDuLieu();
        };
    

        $("#edit").click(function () {
            let sinhvienEdit = [];
            $("#dssv input:checked").each(function () {
                sinhvienEdit.push($(this).val());
            })
           
            let list = JSON.parse(localStorage.getItem("dssv"));
            let n = list.length;
            let sinhvien;
            let id = sinhvienEdit[0];
            for (let i = 0; i < n; i++) {
                console.log(list[i].id )
                if (list[i].id == id) {
                    sinhvien = list[i]
                    break;
                }
            }
            $("#name").val(sinhvien.name);
            $("#my_date_picker").val(sinhvien.birthday);
            $("#mobilephone").val(sinhvien.mobilephone);
            $("#hometown").val(sinhvien.hometown);
            $("#id_student").val(sinhvien.id);
        });

        function updateStudent(sinhvien) {
            let list = JSON.parse(localStorage.getItem("dssv"));
            let n = list.length;
            for (let i = 0; i < n; i++) {
                let a = i + 1;
                if (list[i].id == Student.id) {
                    list[i] = Student;
                }
            }
            localStorage.setItem("dssv", JSON.stringify(list));
        }

    

    
   });
   