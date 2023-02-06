import Config from "@jangaroo/runtime/Config";
import jobService from "@coremedia/studio-client.cap-rest-client/common/jobService";
import GenericRemoteJob from "@coremedia/studio-client.cap-rest-client-impl/common/impl/GenericRemoteJob";
import JobExecutionError from "@coremedia/studio-client.cap-rest-client/common/JobExecutionError";
import { AnyFunction } from "@jangaroo/runtime/types";

class WonkiService {

  static generateKeywords():Promise<string[]> {
    return new Promise((resolve:AnyFunction, reject:AnyFunction) => {
      resolve(["Foo", "Bla", "Blub"])
    });
  }

  static generateTitle():Promise<string> {
    return new Promise((resolve:AnyFunction, reject:AnyFunction) => {
      resolve("This is a nice title.")
    });
  }

  static generateMetaDescription():Promise<string> {
    return new Promise((resolve:AnyFunction, reject:AnyFunction) => {
      resolve("This is a nice meta description.")
    });
  }

  static generateSummary():Promise<string> {
    return new Promise((resolve:AnyFunction, reject:AnyFunction) => {
      resolve("This is a nice summary.")
    });
  }


  private static executeJob(jobType: string, jobParams:Object, onSuccess:Function, onFailure:Function = null) {
    const job = new GenericRemoteJob(jobType, jobParams);
    jobService._.executeJob(
            job,
            () => {onSuccess()},
            (error:JobExecutionError) => {onFailure && onFailure(error)});
  }

}

export default WonkiService;
