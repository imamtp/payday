<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends MY_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->smarty->assign('msg','');
                $this->smarty->display('login.tpl');
	}

	function auth($absen=false)
	{
		$cek = $this->m_user->cekUser($this->input->post('userid'),$this->input->post('password'),$absen);
		// $msg = $cek['success']==false ? $cek['msg'] : null;
		// echo 'adsad';
		echo json_encode($cek);
	}

	// function absen()
	// {
	// 	$cek = $this->m_user->cekUser($this->input->post('userid'),$this->input->post('password'),true);
	// 	// $msg = $cek==true ? "Tanggal: ".date('Y-m-d H:m:s')." <br/><br/> Absen berhasil, Terima Kasih." : "Pegawai ID atau Password Salah";
	// 	echo json_encode($cek);
	// }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
