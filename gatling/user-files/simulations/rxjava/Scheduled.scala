package basic

import io.gatling.core.Predef._ // 2
import io.gatling.http.Predef._
import scala.concurrent.duration._

class Scheduled extends Simulation { // 3

  val httpConf = http // 4
    .baseURL("http://localhost:8080") // 5
  
  val scn = scenario("Scheduled").repeat(100) {
    exec(http("scheduled_call")
    .get("/scheduled")
    .check(status.is(200))) // 9
  }


  setUp( // 11
    scn.inject(atOnceUsers(1000)) // 12
  ).protocols(httpConf) // 13
  .maxDuration(30 seconds)
}
