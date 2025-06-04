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
            ["name" => "Sumijah, S.Pd., M.Si", "username" => "sumijah", "email" => "sumijah@sekolah.ac.id"],
            ["name" => "Drs. H. Ahmad Maksum, M.Pd", "username" => "ahmadmaksum", "email" => "ahmadmaksum@sekolah.ac.id"],
            ["name" => "Moch. Bachrudin, S.Pd", "username" => "mochbachrudin", "email" => "mochbachrudin@sekolah.ac.id"],
            ["name" => "Setyawan Edi, A.Md", "username" => "setyawanedi", "email" => "setyawanedi@sekolah.ac.id"],
            ["name" => "Solikhah, S.Pd", "username" => "solikhah", "email" => "solikhah@sekolah.ac.id"],
            ["name" => "Drs. M. Iqbal Ivan Mas’udy", "username" => "iqbalivan", "email" => "iqbalivan@sekolah.ac.id"],
            ["name" => "Sri Nurul Syamsiah, S.Pd", "username" => "srinurul", "email" => "srinurul@sekolah.ac.id"],
            ["name" => "Dra. Arti Rahayu", "username" => "artirahayu", "email" => "artirahayu@sekolah.ac.id"],
            ["name" => "Mokhamad Imron, S.Kom", "username" => "mokhamadimron", "email" => "mokhamadimron@sekolah.ac.id"],
            ["name" => "Zulkifli Abdillah, S.Kom", "username" => "zulkifliabdillah", "email" => "zulkifliabdillah@sekolah.ac.id"],
            ["name" => "Dyah Ayu Komala, ST", "username" => "dyahayukomala", "email" => "dyahayukomala@sekolah.ac.id"],
            ["name" => "Wiwin Winangsih, S.Pd", "username" => "wiwinwinangsih", "email" => "wiwinwinangsih@sekolah.ac.id"],
            ["name" => "Hermawan, ST", "username" => "hermawan", "email" => "hermawan@sekolah.ac.id"],
            ["name" => "Eri Ferdianti, S.Pd", "username" => "eriferdianti", "email" => "eriferdianti@sekolah.ac.id"],
            ["name" => "Vina Barirotur Rochmah, S.Pd", "username" => "vinabarirotur", "email" => "vinabarirotur@sekolah.ac.id"],
            ["name" => "Moh. Taufik, S.Pd", "username" => "mohtaufik", "email" => "mohtaufik@sekolah.ac.id"],
            ["name" => "Anwar, S.Kom", "username" => "anwar", "email" => "anwar@sekolah.ac.id"],
            ["name" => "Dra. Muntamah", "username" => "muntamah", "email" => "muntamah@sekolah.ac.id"],
            ["name" => "Adhi Bagus Permana, S.Pd", "username" => "adhibagus", "email" => "adhibagus@sekolah.ac.id"],
            ["name" => "Dra. Siti Muzayyanah", "username" => "sitimuzayyanah", "email" => "sitimuzayyanah@sekolah.ac.id"],
            ["name" => "Fajar Ningtyas, S.Pd", "username" => "fajarningtyas", "email" => "fajarningtyas@sekolah.ac.id"],
            ["name" => "Slamet Riyadi, S.Pd", "username" => "slametriyadi", "email" => "slametriyadi@sekolah.ac.id"],
            ["name" => "Triana Ardiani, S.Pd", "username" => "trianaardiani", "email" => "trianaardiani@sekolah.ac.id"],
            ["name" => "Diana Farida, S.Si", "username" => "dianafarida", "email" => "dianafarida@sekolah.ac.id"],
            ["name" => "Sitti Hadijah, S.Pd", "username" => "sittihadijah", "email" => "sittihadijah@sekolah.ac.id"],
            ["name" => "Mustofa, S.Ag", "username" => "mustofa", "email" => "mustofa@sekolah.ac.id"],
            ["name" => "Alifah Diantebes Aindra, S.Pd", "username" => "alifahdiantebes", "email" => "alifahdiantebes@sekolah.ac.id"],
            ["name" => "RR. Henning Gratyanis Anggraeni, S.Pd", "username" => "rerehenning", "email" => "rerehenning@sekolah.ac.id"],
            ["name" => "Olive Khoirul LM AI F, S.Kom, M.Kom", "username" => "olivekhoirul", "email" => "olivekhoirul@sekolah.ac.id"]
        ];
        foreach ($guru as $key => $value) {
            User::create([
                "name" => $value["name"],
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
