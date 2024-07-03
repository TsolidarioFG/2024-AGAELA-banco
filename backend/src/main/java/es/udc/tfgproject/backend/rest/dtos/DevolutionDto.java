package es.udc.tfgproject.backend.rest.dtos;

public class DevolutionDto {

    private String observations;
    private Long devolutionUserId;

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Long getDevolutionUserId() {
        return devolutionUserId;
    }

    public void setDevolutionUserId(Long devolutionUserId) {
        this.devolutionUserId = devolutionUserId;
    }
}
