import jobService from "@coremedia/studio-client.cap-rest-client/common/jobService";
import GenericRemoteJob from "@coremedia/studio-client.cap-rest-client-impl/common/impl/GenericRemoteJob";
import JobExecutionError from "@coremedia/studio-client.cap-rest-client/common/JobExecutionError";
import { AnyFunction } from "@jangaroo/runtime/types";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";

class WonkiService {

  static readonly DEFAULT_PARAMS = { siteId: "all", groupId: "wonki" };

  static readonly GENERATE_KEYWORDS_JOB = "wonkiGenerateKeywords";
  static readonly GENERATE_TITLE_JOB = "wonkiGenerateTitle";
  static readonly GENERATE_META_DESCRIPTION_JOB = "wonkiGenerateMetaDescription";
  static readonly GENERATE_SUMMARY_JOB = "wonkiGenerateSummary";

  /**
   * Generate keywords for the given content.
   *
   * @param content
   */
  static generateKeywords(content: Content): Promise<string[]> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      //this.executeJob(this.GENERATE_KEYWORDS_JOB, this.buildJobParams(content), resolve, reject);
      window.setTimeout(() => {
        resolve(["Productivity", "Experience", "Integrated Technology", "Handheld Ordering", "Payment Devices", "Inquire Devices", "New Technology", "Perfect Bill", "Immediate Payment"]);
      }, 1000);
    });
  }

  /**
   * Generate title for the given content.
   *
   * @param content
   */
  static generateTitle(content: Content): Promise<string> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      this.executeJob(this.GENERATE_TITLE_JOB, this.buildJobParams(content), resolve, reject);
    });
  }

  /**
   * Generate meta description for the given content.
   *
   * @param content
   */
  static generateMetaDescription(content: Content): Promise<string> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      this.executeJob(this.GENERATE_META_DESCRIPTION_JOB, this.buildJobParams(content), resolve, reject);
    });
  }

  /**
   * Generate summary for the given content.
   *
   * @param content
   * @param strategy strategy to use ("extractive" or "abstractive")
   * @param sentences number of sentences for the summary
   * @param greedy
   * @param siteId
   * @param groupId
   */
  static generateSummary(content: Content, strategy:string = "abstractive", sentences: number = 5, greedy: boolean = false): Promise<string> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      this.executeJob(this.GENERATE_SUMMARY_JOB, this.buildJobParams(content, {strategy: strategy, sentences: sentences, greedy: greedy,}), resolve, reject);
    });
  }

  /**
   * Trigger remote job execution.
   *
   * @param jobType job type identifier
   * @param jobParams job parameters
   * @param onSuccess success handler
   * @param onFailure failure handler
   *
   * @private
   */
  private static executeJob(jobType: string, jobParams: Object, onSuccess: Function, onFailure: Function = null) {
    const job = new GenericRemoteJob(jobType, jobParams);
    jobService._.executeJob(job,
            (result: any) => {
              onSuccess && onSuccess(result.data);
            },
            (error: JobExecutionError) => {
              console.error(`Unable to execute job ${jobType}: ${error.message}`);
              onFailure && onFailure(error);
            });
  }

  private static buildJobParams(content:Content, additional:Object = null) {
    let params = {
      content: content
    };

    // calculate siteId
    let siteId = editorContext._.getSitesService().getSiteIdFor(content);
    if (siteId) {
      params["siteId"] = siteId;
    }

    return Object.assign(this.DEFAULT_PARAMS, params, additional);
  }

}

export default WonkiService;
