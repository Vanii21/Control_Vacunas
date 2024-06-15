import Swal from 'sweetalert2';

export const showAlertAccept = (message) => {
    Swal.fire({
        title: '¡EXITO!',
        text: message,
        icon: 'success',
        showConfirmButton: true
    }).then((result) => {
        if(result.isConfirmed){
            window.location.reload();
        }
    });
};

export const showAlertError = (message) => {
    Swal.fire({
        title: 'ERROR',
        text: message,
        icon: 'error',
        timer: 3200,
        timerProgressBar: true,
        showConfirmButton: false
    });
};