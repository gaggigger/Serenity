<?php

use Phpmig\Migration\Migration;

class AddStatesTable extends Migration
{
    protected $tableName;

    /* @var \Illuminate\Database\Schema\Builder $schema */
    protected $schema;

    public function init()
    {
        $this->tableName = 'states_us';
        $this->schema = $this->get('schema');
    }

    /**
     * Do the migration
     */
    public function up()
    {
        /* @var \Illuminate\Database\Schema\Blueprint $table */
        $this->schema->create($this->tableName, function ($table)
        {
            $table->integer('id')->unsigned();
            $table->string('state_code');
            $table->string('state_name');

            // We'll need to ensure that MySQL uses the InnoDB engine to
            // support the indexes, other engines aren't affected.
            $table->engine = 'InnoDB';
            $table->primary(array('id', 'state_code'));
        });
        
        // Insert some stuff
        DB::table($this->tableName)->insert(array('id' => 1,'state_code' => 'AA','state_name' => 'AA Armed Forces'));
        DB::table($this->tableName)->insert(array('id' => 2,'state_code' => 'AE','state_name' => 'AE Armed Forces'));
        DB::table($this->tableName)->insert(array('id' => 3,'state_code' => 'AP','state_name' => 'AP Armed Forces'));
        DB::table($this->tableName)->insert(array('id' => 4,'state_code' => 'AL','state_name' => 'Alabama'));
        DB::table($this->tableName)->insert(array('id' => 5,'state_code' => 'AK','state_name' => 'Alaska'));
        DB::table($this->tableName)->insert(array('id' => 6,'state_code' => 'AZ','state_name' => 'Arizona'));
        DB::table($this->tableName)->insert(array('id' => 7,'state_code' => 'AR','state_name' => 'Arkansas'));
        DB::table($this->tableName)->insert(array('id' => 8,'state_code' => 'CA','state_name' => 'California'));
        DB::table($this->tableName)->insert(array('id' => 9,'state_code' => 'CO','state_name' => 'Colorado'));
        DB::table($this->tableName)->insert(array('id' => 10,'state_code' => 'CT','state_name' => 'Connecticut'));
        DB::table($this->tableName)->insert(array('id' => 11,'state_code' => 'DE','state_name' => 'Delaware'));
        DB::table($this->tableName)->insert(array('id' => 12,'state_code' => 'DC','state_name' => 'District of Columbia'));
        DB::table($this->tableName)->insert(array('id' => 13,'state_code' => 'FL','state_name' => 'Florida'));
        DB::table($this->tableName)->insert(array('id' => 14,'state_code' => 'GA','state_name' => 'Georgia'));
        DB::table($this->tableName)->insert(array('id' => 15,'state_code' => 'HI','state_name' => 'Hawaii'));
        DB::table($this->tableName)->insert(array('id' => 16,'state_code' => 'ID','state_name' => 'Idaho'));
        DB::table($this->tableName)->insert(array('id' => 17,'state_code' => 'IL','state_name' => 'Illinois'));
        DB::table($this->tableName)->insert(array('id' => 18,'state_code' => 'IN','state_name' => 'Indiana'));
        DB::table($this->tableName)->insert(array('id' => 19,'state_code' => 'IA','state_name' => 'Iowa'));
        DB::table($this->tableName)->insert(array('id' => 20,'state_code' => 'KS','state_name' => 'Kansas'));
        DB::table($this->tableName)->insert(array('id' => 21,'state_code' => 'KY','state_name' => 'Kentucky'));
        DB::table($this->tableName)->insert(array('id' => 22,'state_code' => 'LA','state_name' => 'Louisiana'));
        DB::table($this->tableName)->insert(array('id' => 23,'state_code' => 'ME','state_name' => 'Maine'));
        DB::table($this->tableName)->insert(array('id' => 24,'state_code' => 'MD','state_name' => 'Maryland'));
        DB::table($this->tableName)->insert(array('id' => 25,'state_code' => 'MA','state_name' => 'Massachusetts'));
        DB::table($this->tableName)->insert(array('id' => 26,'state_code' => 'MI','state_name' => 'Michigan'));
        DB::table($this->tableName)->insert(array('id' => 27,'state_code' => 'MN','state_name' => 'Minnesota'));
        DB::table($this->tableName)->insert(array('id' => 28,'state_code' => 'MS','state_name' => 'Mississippi'));
        DB::table($this->tableName)->insert(array('id' => 29,'state_code' => 'MO','state_name' => 'Missouri'));
        DB::table($this->tableName)->insert(array('id' => 30,'state_code' => 'MT','state_name' => 'Montana'));
        DB::table($this->tableName)->insert(array('id' => 31,'state_code' => 'NE','state_name' => 'Nebraska'));
        DB::table($this->tableName)->insert(array('id' => 32,'state_code' => 'NV','state_name' => 'Nevada'));
        DB::table($this->tableName)->insert(array('id' => 33,'state_code' => 'NH','state_name' => 'New Hampshire'));
        DB::table($this->tableName)->insert(array('id' => 34,'state_code' => 'NJ','state_name' => 'New Jersey'));
        DB::table($this->tableName)->insert(array('id' => 35,'state_code' => 'NM','state_name' => 'New Mexico'));
        DB::table($this->tableName)->insert(array('id' => 36,'state_code' => 'NY','state_name' => 'New York'));
        DB::table($this->tableName)->insert(array('id' => 37,'state_code' => 'NC','state_name' => 'North Carolina'));
        DB::table($this->tableName)->insert(array('id' => 38,'state_code' => 'ND','state_name' => 'North Dakota'));
        DB::table($this->tableName)->insert(array('id' => 39,'state_code' => 'OH','state_name' => 'Ohio'));
        DB::table($this->tableName)->insert(array('id' => 40,'state_code' => 'OK','state_name' => 'Oklahoma'));
        DB::table($this->tableName)->insert(array('id' => 41,'state_code' => 'OR','state_name' => 'Oregon'));
        DB::table($this->tableName)->insert(array('id' => 42,'state_code' => 'PA','state_name' => 'Pennsylvania'));
        DB::table($this->tableName)->insert(array('id' => 43,'state_code' => 'RI','state_name' => 'Rhode Island'));
        DB::table($this->tableName)->insert(array('id' => 44,'state_code' => 'SC','state_name' => 'South Carolina'));
        DB::table($this->tableName)->insert(array('id' => 45,'state_code' => 'SD','state_name' => 'South Dakota'));
        DB::table($this->tableName)->insert(array('id' => 46,'state_code' => 'TN','state_name' => 'Tennessee'));
        DB::table($this->tableName)->insert(array('id' => 47,'state_code' => 'TX','state_name' => 'Texas'));
        DB::table($this->tableName)->insert(array('id' => 48,'state_code' => 'UT','state_name' => 'Utah'));
        DB::table($this->tableName)->insert(array('id' => 49,'state_code' => 'VT','state_name' => 'Vermont'));
        DB::table($this->tableName)->insert(array('id' => 50,'state_code' => 'VA','state_name' => 'Virginia'));
        DB::table($this->tableName)->insert(array('id' => 51,'state_code' => 'WA','state_name' => 'Washington'));
        DB::table($this->tableName)->insert(array('id' => 52,'state_code' => 'WV','state_name' => 'West Virginia'));
        DB::table($this->tableName)->insert(array('id' => 53,'state_code' => 'WI','state_name' => 'Wisconsin'));
        DB::table($this->tableName)->insert(array('id' => 54,'state_code' => 'WY','state_name' => 'Wyoming'));
    }

    /**
     * Undo the migration
     */
    public function down()
    {
        $this->schema->drop($this->tableName);
    }
}
