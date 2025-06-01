<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalTemu extends Model
{
    protected $table = 'jadwal_temu';
    protected $guarded = [];
    public $timestamps = false;

    /**
     * Get the tamu that owns the JadwalTemu
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tamu()
    {
        return $this->belongsTo(Tamu::class, 'tamu_id');
    }
    public function guru()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
