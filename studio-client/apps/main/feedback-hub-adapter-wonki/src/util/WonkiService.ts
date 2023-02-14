import jobService from "@coremedia/studio-client.cap-rest-client/common/jobService";
import GenericRemoteJob from "@coremedia/studio-client.cap-rest-client-impl/common/impl/GenericRemoteJob";
import JobExecutionError from "@coremedia/studio-client.cap-rest-client/common/JobExecutionError";
import {AnyFunction} from "@jangaroo/runtime/types";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";

class WonkiService {

  static readonly DEFAULT_PARAMS = {siteId: "all", groupId: "wonki"};

  static readonly TRANSFORM_JOB = "wonkiTransform";
  static readonly GENERATE_SUMMARY_JOB = "wonkiGenerateSummary";

  /**
   * Generate keywords for the given content.
   *
   * @param content
   */
  static generateKeywords(content: Content): Promise<string[]> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      this.executeJob(this.TRANSFORM_JOB, this.buildJobParams(content, {transformType: "keywords"}), resolve, reject);
    });
  }

  /**
   * Generate title for the given content.
   *
   * @param content
   */
  static generateTitle(content: Content): Promise<string> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      this.executeJob(this.TRANSFORM_JOB, this.buildJobParams(content, {transformType: "title"}), resolve, reject);
    });
  }

  /**
   * Generate meta description for the given content.
   *
   * @param content
   */
  static generateMetaDescription(content: Content): Promise<string> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      this.executeJob(this.TRANSFORM_JOB, this.buildJobParams(content, {transformType: "metaDescription"}), resolve, reject);
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
  static generateSummary(content: Content, strategy: string = "abstractive", sentences: number = 5, greedy: boolean = false): Promise<string> {
    return new Promise((resolve: AnyFunction, reject: AnyFunction) => {
      this.executeJob(this.GENERATE_SUMMARY_JOB, this.buildJobParams(content, {
        strategy: strategy,
        sentences: sentences,
        greedy: greedy,
      }), resolve, reject);
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

  private static buildJobParams(content: Content, additional: Object = null) {
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
