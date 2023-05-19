import {UserSystem} from "./user-system";
import {ServiceModel} from "./service-model";
import {MeteringDevices} from "./metering-devices";

export class FlatUser {
  numberOfFlat:number=0;
  userSystemDTO:UserSystem=new UserSystem();
  serviceDTOS:ServiceModel[]=[];
  meteringDevicesDTOS:MeteringDevices[]=[];
  serviceDTOReceipt:ServiceModel=new ServiceModel();

}
