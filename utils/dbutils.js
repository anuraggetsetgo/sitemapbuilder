
/**
 * Get a connection to the supplied database
 *
 * Connects to the database host in process.env.DB_HOSTNAME with the username in process.env.DB_USER
 *
 * @param {string} database - Database name
 */
 
 let AWS = require('aws-sdk');
 let mysql2 = require('mysql2'); //https://www.npmjs.com/package/mysql2
 const config={
    username:'admin',
    hostname:'gsgproxy.endpoint.proxy-chlw7buxwsjs.ap-south-1.rds.amazonaws.com',
    port:3306,
    region:'ap-south-1',
    database:'getsetgo_master',

 }
 let connection;
 const getConnection = async (database) => {
     const signer = new AWS.RDS.Signer({
         username: config.username,
         hostname: config.hostname,
         port: config.port
     })
 
     console.debug('Connecting to MySQL proxy via IAM authentication')
     // console.debug(`Requesting auth token for user ${process.env.DB_USER}`)
 
     const rdsSignerAuth = () => () => {
         console.debug('CALL rdsSignerAuth')
         return signer.getAuthToken({
             username: config.username,
             region: config.region,
             hostname: config.hostname,
             port: config.port
         })
     }
 
     let connection
     try {
         connection = await mysql2.createConnection({
             host: config.hostname,
             user: config.username,
             database: database,
             ssl: { rejectUnauthorized: false },
             authPlugins: { mysql_clear_password: rdsSignerAuth }
         })
 
         console.debug('Connected');
     } catch (e) {
         console.error(`MySQL connection error: ${e}`)
         throw e
     }
     return connection
 }
 
 const executeSQLQuery = async (query) => {
     connection = await getConnection(config.database);
     let data_db = null;
     const result = await connection.promise().query(query)
         .then(data => 
                   {console.log("Data retrived");
                     data_db = data;
                   }
                 )
         
         .catch(err => {
            connection.end(); 
            console.error('MySQL connection error:', err); throw (err);   
            }
         )
         connection.end(); 
     return (data_db);
 
 }
 const executeSQLQueryWithConnection = async (query) => {
    connection = await getConnection(config.database);
    let data_db = null;
    const result = await connection.promise().query(query)
        .then(data => 
                  {console.log("Data retrived");
                    data_db = data;
                  }
                )
        
        .catch(err => {
           //connection.end(); 
           console.error('MySQL connection error:', err); throw (err);   
           }
        )
        //connection.end(); 
    return (data_db);

}
const closeConnection= ()=>{
    connection.end();
    connection=null;
}
 module.exports = {
            getConnection,
            executeSQLQuery,
            executeSQLQueryWithConnection,
            closeConnection
     }