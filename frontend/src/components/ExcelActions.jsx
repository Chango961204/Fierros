import api from '../api/axios';

export default function ExcelActions({ onSuccess }) {

    const exportarExcel = async () => {
        const res = await api.get('/excel/exportar', {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'personas.xlsx';
        link.click();
    };

    const importarExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('/excel/importar', formData);
            alert('Excel importado correctamente');
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('Error al importar');
        }
    };

    return (
        <div className="flex gap-4 flex-wrap">

            <button
                onClick={exportarExcel}
                className="btn-success"
            >
                Exportar Excel
            </button>

            <label className="btn-primary cursor-pointer">
                Importar Excel
                <input
                    type="file"
                    accept=".xlsx"
                    hidden
                    onChange={importarExcel}
                />
            </label>

        </div>
    );
}