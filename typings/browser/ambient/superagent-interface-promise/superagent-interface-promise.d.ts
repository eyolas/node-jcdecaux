declare module "superagent-interface-promise" {
  import * as superagent from 'superagent';

  var request: requestS.SuperAgentStaticPromise;


  module requestS {

    interface SuperAgentStaticPromise extends superagent.SuperAgent<RequestPromise> {
      promise: PromiseConstructor;

      (url: string): RequestPromise;
      (method: string, url: string): RequestPromise;

      agent(): superagent.SuperAgent<RequestPromise>;

    }

    interface RequestPromise extends superagent.Request<RequestPromise> {
      promise():Promise<Response>;
      then():Promise<Response>;
    }

    interface Response extends superagent.Response {
    }
  }

  export = request;
}
