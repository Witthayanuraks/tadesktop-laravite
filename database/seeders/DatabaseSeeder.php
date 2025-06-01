<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $guru = [
            ["nama" => "Sumijah, S.Pd., M.Si", "username" => "sumijah", "email" => "sumijah@sekolah.ac.id"],
            ["nama" => "Drs. H. Ahmad Maksum, M.Pd", "username" => "ahmadmaksum", "email" => "ahmadmaksum@sekolah.ac.id"],
            ["nama" => "Moch. Bachrudin, S.Pd", "username" => "mochbachrudin", "email" => "mochbachrudin@sekolah.ac.id"],
            ["nama" => "Setyawan Edi, A.Md", "username" => "setyawanedi", "email" => "setyawanedi@sekolah.ac.id"],
            ["nama" => "Solikhah, S.Pd", "username" => "solikhah", "email" => "solikhah@sekolah.ac.id"],
            ["nama" => "Drs. M. Iqbal Ivan Mas’udy", "username" => "iqbalivan", "email" => "iqbalivan@sekolah.ac.id"],
            ["nama" => "Sri Nurul Syamsiah, S.Pd", "username" => "srinurul", "email" => "srinurul@sekolah.ac.id"],
            ["nama" => "Dra. Arti Rahayu", "username" => "artirahayu", "email" => "artirahayu@sekolah.ac.id"],
            ["nama" => "Mokhamad Imron, S.Kom", "username" => "mokhamadimron", "email" => "mokhamadimron@sekolah.ac.id"],
            ["nama" => "Zulkifli Abdillah, S.Kom", "username" => "zulkifliabdillah", "email" => "zulkifliabdillah@sekolah.ac.id"],
            ["nama" => "Dyah Ayu Komala, ST", "username" => "dyahayukomala", "email" => "dyahayukomala@sekolah.ac.id"],
            ["nama" => "Wiwin Winangsih, S.Pd", "username" => "wiwinwinangsih", "email" => "wiwinwinangsih@sekolah.ac.id"],
            ["nama" => "Hermawan, ST", "username" => "hermawan", "email" => "hermawan@sekolah.ac.id"],
            ["nama" => "Eri Ferdianti, S.Pd", "username" => "eriferdianti", "email" => "eriferdianti@sekolah.ac.id"],
            ["nama" => "Vina Barirotur Rochmah, S.Pd", "username" => "vinabarirotur", "email" => "vinabarirotur@sekolah.ac.id"],
            ["nama" => "Moh. Taufik, S.Pd", "username" => "mohtaufik", "email" => "mohtaufik@sekolah.ac.id"],
            ["nama" => "Anwar, S.Kom", "username" => "anwar", "email" => "anwar@sekolah.ac.id"],
            ["nama" => "Dra. Muntamah", "username" => "muntamah", "email" => "muntamah@sekolah.ac.id"],
            ["nama" => "Adhi Bagus Permana, S.Pd", "username" => "adhibagus", "email" => "adhibagus@sekolah.ac.id"],
            ["nama" => "Dra. Siti Muzayyanah", "username" => "sitimuzayyanah", "email" => "sitimuzayyanah@sekolah.ac.id"],
            ["nama" => "Fajar Ningtyas, S.Pd", "username" => "fajarningtyas", "email" => "fajarningtyas@sekolah.ac.id"],
            ["nama" => "Slamet Riyadi, S.Pd", "username" => "slametriyadi", "email" => "slametriyadi@sekolah.ac.id"],
            ["nama" => "Triana Ardiani, S.Pd", "username" => "trianaardiani", "email" => "trianaardiani@sekolah.ac.id"],
            ["nama" => "Diana Farida, S.Si", "username" => "dianafarida", "email" => "dianafarida@sekolah.ac.id"],
            ["nama" => "Sitti Hadijah, S.Pd", "username" => "sittihadijah", "email" => "sittihadijah@sekolah.ac.id"],
            ["nama" => "Mustofa, S.Ag", "username" => "mustofa", "email" => "mustofa@sekolah.ac.id"],
            ["nama" => "Alifah Diantebes Aindra, S.Pd", "username" => "alifahdiantebes", "email" => "alifahdiantebes@sekolah.ac.id"],
            ["nama" => "RR. Henning Gratyanis Anggraeni, S.Pd", "username" => "rerehenning", "email" => "rerehenning@sekolah.ac.id"],
            ["nama" => "Olive Khoirul LM AI F, S.Kom, M.Kom", "username" => "olivekhoirul", "email" => "olivekhoirul@sekolah.ac.id"]
        ];
        foreach ($guru as $key => $value) {
            User::create([
                "name" => $value["nama"],
                "username" => $value["username"],
                'email' => $value["email"],
                'email_verified_at' => now(),
                'password' =>  Hash::make('pass123'),
                "role" => "Guru"
            ]);
        }
        User::create([
            "name" => "Ardi Saputro",
            "username" => "ardi",
            'email' => "ardi@gmail.com",
            'email_verified_at' => now(),
            'password' =>  Hash::make('pass123'),
            "role" => "Penerima Tamu"
        ]);
        User::create([
            "name" => "Sholeh Darat",
            "username" => "sholeh",
            'email' => "sholeh@gmail.com",
            'email_verified_at' => now(),
            'password' =>  Hash::make('pass123'),
            "role" => "Admin"
        ]);
    }
}
