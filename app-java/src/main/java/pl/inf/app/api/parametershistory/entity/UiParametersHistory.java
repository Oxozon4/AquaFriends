package pl.inf.app.api.parametershistory.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UiParametersHistory {
	private int id;
	private Timestamp timestamp;
	private float no2;
	private float no3;
	private float gh;
	private float kh;
	private float ph;
}
