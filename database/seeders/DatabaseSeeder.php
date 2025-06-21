<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $myUser = User::factory()->create([
            'name' => 'Admin Keren',
            'email' => 'admin@webify.com',
        ]);

        Post::factory(20)->create([
            'user_id' => $myUser->id, // Assuming the first user is the admin
        ]);
    }
}
