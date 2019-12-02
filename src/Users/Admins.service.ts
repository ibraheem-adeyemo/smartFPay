import {DataService} from '../shared/services/data.service';
import {appConstants} from '../App.constants';

export class AdminsService {
    protected dataService: DataService;

    constructor() {
        this.dataService = new DataService();
    }

    public createAdminUsers = (body: any) => {
        return this.dataService.post(`${appConstants.endpoint}${appConstants.admin}`, body);
    };

    public assignRole = (body: any) => {
        return this.dataService.put(`${appConstants.endpoint}${appConstants.admin}/assign-role`, body);
    }

    public unassignRole = (body: any) => {
        return this.dataService.put(`${appConstants.endpoint}${appConstants.admin}/unassign-role`, body);
    }
}