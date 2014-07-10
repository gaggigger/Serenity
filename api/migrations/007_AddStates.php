<?php

use Sernity\Migration;
use Illuminate\Database\Seeder;

class AddStates extends Migration
{
    public function init($capsule)
    {
        parent::init();
        $this->seed = true;
        $this->tableName = 'states_us';
    }
    /**
     * Do the migration
     */
    public function up()
    {
        /* @var \Illuminate\Database\Schema\Blueprint $table */
        $this->schema->dropIfExists($this->tableName);
        $this->schema->create($this->tableName, function ($table)
        {
            $table->integer('id')->unsigned();
            $table->string('state_code');
            $table->string('state_name');

            $table->engine = 'InnoDB';
            $table->primary(array('id', 'state_code'));
            return true;
        });
    }
    /**
     * Undo the migration
     */
    public function down()
    {
        $this->schema->drop($this->tableName);
        return true;
    }
}

class AddStatesSeed extends Seeder 
{
    public function run($capsule) {
        $table = $capsule->table($this->tableName);
        $table->insert(array('id' => 1,'state_code' => 'AA','state_name' => 'AA Armed Forces'));
        $table->insert(array('id' => 2,'state_code' => 'AE','state_name' => 'AE Armed Forces'));
        $table->insert(array('id' => 3,'state_code' => 'AP','state_name' => 'AP Armed Forces'));
        $table->insert(array('id' => 4,'state_code' => 'AL','state_name' => 'Alabama'));
        $table->insert(array('id' => 5,'state_code' => 'AK','state_name' => 'Alaska'));
        $table->insert(array('id' => 6,'state_code' => 'AZ','state_name' => 'Arizona'));
        $table->insert(array('id' => 7,'state_code' => 'AR','state_name' => 'Arkansas'));
        $table->insert(array('id' => 8,'state_code' => 'CA','state_name' => 'California'));
        $table->insert(array('id' => 9,'state_code' => 'CO','state_name' => 'Colorado'));
        $table->insert(array('id' => 10,'state_code' => 'CT','state_name' => 'Connecticut'));
        $table->insert(array('id' => 11,'state_code' => 'DE','state_name' => 'Delaware'));
        $table->insert(array('id' => 12,'state_code' => 'DC','state_name' => 'District of Columbia'));
        $table->insert(array('id' => 13,'state_code' => 'FL','state_name' => 'Florida'));
        $table->insert(array('id' => 14,'state_code' => 'GA','state_name' => 'Georgia'));
        $table->insert(array('id' => 15,'state_code' => 'HI','state_name' => 'Hawaii'));
        $table->insert(array('id' => 16,'state_code' => 'ID','state_name' => 'Idaho'));
        $table->insert(array('id' => 17,'state_code' => 'IL','state_name' => 'Illinois'));
        $table->insert(array('id' => 18,'state_code' => 'IN','state_name' => 'Indiana'));
        $table->insert(array('id' => 19,'state_code' => 'IA','state_name' => 'Iowa'));
        $table->insert(array('id' => 20,'state_code' => 'KS','state_name' => 'Kansas'));
        $table->insert(array('id' => 21,'state_code' => 'KY','state_name' => 'Kentucky'));
        $table->insert(array('id' => 22,'state_code' => 'LA','state_name' => 'Louisiana'));
        $table->insert(array('id' => 23,'state_code' => 'ME','state_name' => 'Maine'));
        $table->insert(array('id' => 24,'state_code' => 'MD','state_name' => 'Maryland'));
        $table->insert(array('id' => 25,'state_code' => 'MA','state_name' => 'Massachusetts'));
        $table->insert(array('id' => 26,'state_code' => 'MI','state_name' => 'Michigan'));
        $table->insert(array('id' => 27,'state_code' => 'MN','state_name' => 'Minnesota'));
        $table->insert(array('id' => 28,'state_code' => 'MS','state_name' => 'Mississippi'));
        $table->insert(array('id' => 29,'state_code' => 'MO','state_name' => 'Missouri'));
        $table->insert(array('id' => 30,'state_code' => 'MT','state_name' => 'Montana'));
        $table->insert(array('id' => 31,'state_code' => 'NE','state_name' => 'Nebraska'));
        $table->insert(array('id' => 32,'state_code' => 'NV','state_name' => 'Nevada'));
        $table->insert(array('id' => 33,'state_code' => 'NH','state_name' => 'New Hampshire'));
        $table->insert(array('id' => 34,'state_code' => 'NJ','state_name' => 'New Jersey'));
        $table->insert(array('id' => 35,'state_code' => 'NM','state_name' => 'New Mexico'));
        $table->insert(array('id' => 36,'state_code' => 'NY','state_name' => 'New York'));
        $table->insert(array('id' => 37,'state_code' => 'NC','state_name' => 'North Carolina'));
        $table->insert(array('id' => 38,'state_code' => 'ND','state_name' => 'North Dakota'));
        $table->insert(array('id' => 39,'state_code' => 'OH','state_name' => 'Ohio'));
        $table->insert(array('id' => 40,'state_code' => 'OK','state_name' => 'Oklahoma'));
        $table->insert(array('id' => 41,'state_code' => 'OR','state_name' => 'Oregon'));
        $table->insert(array('id' => 42,'state_code' => 'PA','state_name' => 'Pennsylvania'));
        $table->insert(array('id' => 43,'state_code' => 'RI','state_name' => 'Rhode Island'));
        $table->insert(array('id' => 44,'state_code' => 'SC','state_name' => 'South Carolina'));
        $table->insert(array('id' => 45,'state_code' => 'SD','state_name' => 'South Dakota'));
        $table->insert(array('id' => 46,'state_code' => 'TN','state_name' => 'Tennessee'));
        $table->insert(array('id' => 47,'state_code' => 'TX','state_name' => 'Texas'));
        $table->insert(array('id' => 48,'state_code' => 'UT','state_name' => 'Utah'));
        $table->insert(array('id' => 49,'state_code' => 'VT','state_name' => 'Vermont'));
        $table->insert(array('id' => 50,'state_code' => 'VA','state_name' => 'Virginia'));
        $table->insert(array('id' => 51,'state_code' => 'WA','state_name' => 'Washington'));
        $table->insert(array('id' => 52,'state_code' => 'WV','state_name' => 'West Virginia'));
        $table->insert(array('id' => 53,'state_code' => 'WI','state_name' => 'Wisconsin'));
        $table->insert(array('id' => 54,'state_code' => 'WY','state_name' => 'Wyoming'));
    }
}